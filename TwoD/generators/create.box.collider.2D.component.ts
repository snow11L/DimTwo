import type { GameEntity } from "../base/GameEntity";
import type { BoxCollider2DType, BoxColliderOptions } from "../components";
import { CollisionMask } from "../components/physics/collisionMatrix/CollisionMaskTypes";
import { ComponentType } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";


export function BoxCollider2D(gameEntity: GameEntity, options?: BoxColliderOptions): BoxCollider2DType {
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