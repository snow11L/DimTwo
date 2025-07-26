
import {
  type BoxCollider2DType,
  type CircleCollider2DType,
  Collider,
  type ColliderType,
  CollisionMatrix,
  RigidBody2DLib,
  type RigidBody2DType,

  TransformLib,

  type TransformType
} from "../components";
import { ComponentState, type ComponentStateType, type System, SystemState, type SystemStateType } from "../ecs";

import { ComponentTypes } from "../components/component-type";
import { SpatialHash } from "../lib/SpatialHash";
import type { Vec2 } from "../math/vec2/Vec2";
import { Scene } from "../resources/scene/scene";

// Util
function makePairKey(id1: number, id2: number): string {
  return id1 < id2 ? `${id1}::${id2}` : `${id2}::${id1}`;
}

interface CollisionPair {
  a: ColliderType;
  b: ColliderType;
}

function getColliderMinMax(
  collider: ColliderType,
  position: Vec2,
  outMin: Vec2,
  outMax: Vec2,
) {
  const offset = collider.center ?? { x: 0, y: 0 };
  const centerX = position.x + offset.x;
  const centerY = position.y + offset.y;

  if (collider.type === ComponentTypes.BoxCollider2D) {
    const box = collider as BoxCollider2DType;
    const halfW = box.size.x / 2;
    const halfH = box.size.y / 2;

    outMin.x = centerX - halfW;
    outMin.y = centerY - halfH;
    outMax.x = centerX + halfW;
    outMax.y = centerY + halfH;
  } else if (collider.type === ComponentTypes.CircleCollider2D) {
    const circle = collider as CircleCollider2DType;
    const r = circle.radius;

    outMin.x = centerX - r;
    outMin.y = centerY - r;
    outMax.x = centerX + r;
    outMax.y = centerY + r;
  }
}

export interface CollisionState {
  previous: Map<string, CollisionPair>;
  current: Map<string, CollisionPair>;
  checked: Set<string>;
  collision: Set<string>;
}

export function ColliderSystem(
  componentState: ComponentStateType,
  state: SystemStateType,
): System {
  const tempMin = { x: 0, y: 0 };
  const tempMax = { x: 0, y: 0 };

  const spatialHash = new SpatialHash<ColliderType>(64);

  const collisionState: CollisionState = {
    previous: new Map<string, CollisionPair>(),
    current: new Map<string, CollisionPair>(),
    checked: new Set<string>(),
    collision: new Set<string>(),
  };

  return {
    fixedUpdate() {
      collisionState.current.clear();
      collisionState.checked.clear();
      collisionState.collision.clear();
      spatialHash.clear();

      const colliders = ComponentState.getComponentsByCategory<ColliderType>(
        componentState,
        ComponentTypes.Collider,
      );

      for (const collider of colliders) {
        if (!collider.enabled) continue;

        const transform = ComponentState.getComponent<TransformType>(
          componentState,
          collider.gameEntity,
          ComponentTypes.Transform,
        );
        if (!transform) continue;

        getColliderMinMax(collider, transform.position, tempMin, tempMax);
        spatialHash.insert(tempMin, tempMax, collider);
      }

      detectCollisions(
        componentState,
        spatialHash,
        collisionState,
        state,
      );
    },
  };
}

function detectCollisions(
  componentState: ComponentStateType,
  spatialHash: SpatialHash<ColliderType>,
  collisionState: CollisionState,
  systems: SystemStateType,
) {
  const scene = Scene.getCurrentScene();

  for (const collidersInCell of spatialHash.getBuckets()) {
    const length = collidersInCell.length;

    for (let i = 0; i < length; i++) {
      const colliderA = collidersInCell[i];
      const aTransform = TransformLib.getTransform(colliderA.gameEntity);
      if (!aTransform) continue;

      for (let j = i + 1; j < length; j++) {
        const colliderB = collidersInCell[j];
        if (colliderA.gameEntity.id === colliderB.gameEntity.id) continue;

        if (
          !CollisionMatrix.canCollide(
            scene.collisionMatrix,
            colliderA.collisionMask,
            colliderB.collisionMask,
          )
        ) continue;

        const bTransform = TransformLib.getTransform(colliderB.gameEntity);
        if (!bTransform) continue;

        const pairKey = makePairKey(colliderA.instanceID, colliderB.instanceID);

        if (collisionState.checked.has(pairKey)) continue;
        collisionState.checked.add(pairKey);

        if (!Collider.testOverlap(aTransform.position, colliderA, bTransform.position, colliderB)) {
          continue;
        }

        collisionState.current.set(pairKey, { a: colliderA, b: colliderB });

        collisionState.collision.add(colliderA.instanceID.toString());
        collisionState.collision.add(colliderB.instanceID.toString());

        const wasColliding = collisionState.previous.has(pairKey);

        const aIsTrigger = colliderA.isTrigger;
        const bIsTrigger = colliderB.isTrigger;
        const isTriggerInteraction = aIsTrigger || bIsTrigger;

        if (isTriggerInteraction) {
          if (!wasColliding) {
            SystemState.callTriggerEnterEvents(systems, {
              a: colliderA,
              b: colliderB,
            });
          }
          SystemState.callTriggerStayEvents(systems, {
            a: colliderA,
            b: colliderB,
          });
          colliderA.isColliding = true;
          colliderB.isColliding = true;
          continue;
        }

        if (!wasColliding) {
          SystemState.callCollisionEnterEvents(systems, {
            a: colliderA,
            b: colliderB,
          });
        }

        SystemState.callCollisionStayEvents(systems, {
          a: colliderA,
          b: colliderB,
        });
        colliderA.isColliding = true;
        colliderB.isColliding = true;

        const resolution = Collider.resolveOverlap(
          aTransform.position,
          colliderA,
          bTransform.position,
          colliderB,
        );

        if (resolution) {

          const aRigid = ComponentState.getComponent<RigidBody2DType>(
            componentState,
            colliderA.gameEntity,
            ComponentTypes.RigidBody2D,
          );

          const bRigid = ComponentState.getComponent<RigidBody2DType>(
            componentState,
            colliderB.gameEntity,
            ComponentTypes.RigidBody2D,
          );

          if (!aRigid || !bRigid) return;

          RigidBody2DLib.resolveRigidBody(
            aRigid,
            aTransform,
            bRigid,
            bTransform,
            resolution,
          );
        }
      }
    }
  }

  for (const [pairKey, pair] of collisionState.previous.entries()) {
    if (!collisionState.current.has(pairKey)) {
      if (pair.a.isTrigger || pair.b.isTrigger) {
        SystemState.callTriggerExitEvents(systems, pair);
        pair.a.isColliding = false;
        pair.b.isColliding = false;
      } else {
        pair.a.isColliding = false;
        pair.b.isColliding = false;
        SystemState.callCollisionExitEvents(systems, pair);
      }
    }
  }

  collisionState.previous.clear();
  for (const [pairKey, pair] of collisionState.current.entries()) {
    collisionState.previous.set(pairKey, pair);
  }
}
