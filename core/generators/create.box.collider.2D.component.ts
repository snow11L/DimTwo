import type { BoxCollider2D, BoxColliderOptions } from "../components/box-collider-2d/box.collider.2d.types";
import { CollisionMask } from "../physics/collision/CollisionMatrix";
import { ComponentType } from "../types/component-type";
import type { GameEntity } from "../types/EngineEntity";
import { createIncrementalId } from "./create.incremental.id";

export function createBoxCollider2D(gameEntity: GameEntity, options?: BoxColliderOptions): BoxCollider2D {
    return {
        isColliding: false,
        gameEntity: gameEntity,
        category: ComponentType.Collider,
        type: ComponentType.BoxCollider2D,
        enabled: true,
        ignoreSelfCollisions: true,
        instanceID: createIncrementalId(),
        isTrigger: false,
        collisionMask: CollisionMask.DEFAULT,
        center: { x: 0, y: 0, z: 0 },
        size: { x: 0.5, y: 0.5, z: 0 },
        ...options
    }
}