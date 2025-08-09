
import { ComponentState, type ComponentStateType, type System, SystemState, type SystemStateType } from "../ecs";

import { ComponentTypes } from "../../components/component-type";
import type { BoxCollider2D } from "../../components/physics/boxCollider2D/BoxCollider2D";
import type { CircleCollider2D } from "../../components/physics/circleCollider2D/CircleCollider2D";
import { resolveOverlap } from "../../components/physics/collider/CollisionResolver";
import { testOverlap } from "../../components/physics/collider/CollisionTester";
import type { Collider } from "../../components/physics/collider/types";
import { RigidBody2D } from "../../components/physics/rigidBody2D/RigidBody";
import { Transform } from "../../components/spatial/transform/Transform";
import { canCollide } from "../core/collisionMatrix";
import { SpatialHash } from "../lib/SpatialHash";
import type { Vec2 } from "../math/vec2/Vec2";
import { Scene } from "../resources/scene/scene";

// Util
function makePairKey(id1: number, id2: number): string {
  return id1 < id2 ? `${id1}::${id2}` : `${id2}::${id1}`;
}

interface CollisionPair {
  a: Collider;
  b: Collider;
}

function getColliderMinMax(
  collider: Collider,
  position: Vec2,
  outMin: Vec2,
  outMax: Vec2,
) {
  const offset = collider.center ?? { x: 0, y: 0 };
  const centerX = position.x + offset.x;
  const centerY = position.y + offset.y;

  if (collider.type === ComponentTypes.BoxCollider2D) {
    const box = collider as BoxCollider2D;
    const halfW = box.size.x / 2;
    const halfH = box.size.y / 2;

    outMin.x = centerX - halfW;
    outMin.y = centerY - halfH;
    outMax.x = centerX + halfW;
    outMax.y = centerY + halfH;
  } else if (collider.type === ComponentTypes.CircleCollider2D) {
    const circle = collider as CircleCollider2D;
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

  const spatialHash = new SpatialHash<Collider>(64);

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

      const colliders = ComponentState.getComponentsByCategory<Collider>(
        componentState,
        ComponentTypes.Collider,
      );

      for (const collider of colliders) {
        if (!collider.enabled) continue;

        const transform = ComponentState.getComponent<Transform>(
          componentState,
          collider.getGameEntity(),
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
  spatialHash: SpatialHash<Collider>,
  collisionState: CollisionState,
  systems: SystemStateType,
) {
  const scene = Scene.getCurrentScene();

  for (const collidersInCell of spatialHash.getBuckets()) {
    const length = collidersInCell.length;

    for (let i = 0; i < length; i++) {
      const colliderA = collidersInCell[i];
      const aTransform = Transform.getTransform(colliderA.getGameEntity());
      if (!aTransform) continue;

      for (let j = i + 1; j < length; j++) {
        const colliderB = collidersInCell[j];
        if (colliderA.getGameEntity().id === colliderB.getGameEntity().id) continue;

        if (
          !canCollide(
            scene.collisionMatrix,
            colliderA.collisionMask,
            colliderB.collisionMask,
          )
        ) continue;

        const bTransform = Transform.getTransform(colliderB.getGameEntity());
        if (!bTransform) continue;

        const pairKey = makePairKey(colliderA.instanceID.getValue(), colliderB.instanceID.getValue());

        if (collisionState.checked.has(pairKey)) continue;
        collisionState.checked.add(pairKey);

        if (!testOverlap(aTransform.position, colliderA, bTransform.position, colliderB)) {
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

        const resolution = resolveOverlap(
          aTransform.position,
          colliderA,
          bTransform.position,
          colliderB,
        );

        if (resolution) {

          const aRigid = ComponentState.getComponent<RigidBody2D>(
            componentState,
            colliderA.getGameEntity(),
            ComponentTypes.RigidBody2D,
          );

          const bRigid = ComponentState.getComponent<RigidBody2D>(
            componentState,
            colliderB.getGameEntity(),
            ComponentTypes.RigidBody2D,
          );

          if (!aRigid || !bRigid) return;

          RigidBody2D.resolveRigidBody(
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
