import type { CircleCollider2D, CircleColliderOptions } from "../components/circle-collider-2d/circle.collider.2d.types";
import { CollisionMask } from "../components/physics/collider/CollisionMatrix";
import { ComponentType } from "../types/component-type";
import type { GameEntity } from "../types/EngineEntity";
import { createIncrementalId } from "./create.incremental.id";

export function createCircleColliderComponent(gameEntity: GameEntity, options?: CircleColliderOptions): CircleCollider2D {
    return {
        gameEntity: gameEntity,
        category: ComponentType.Collider,
        type: ComponentType.CircleCollider2D,
        enabled: true,
        ignoreSelfCollisions: true,
        instanceID: createIncrementalId(),
        isTrigger: false,
        center: { x: 0, y: 0, z: 0 },
        isColliding: false,
        collisionMask: CollisionMask.DEFAULT,
        radius: 0.5,
        ...options
    }
}