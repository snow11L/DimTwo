import type { GameEntity } from "../base/GameEntity";
import { CollisionMask } from "../components/physics/collisionMatrix/CollisionMaskTypes";
import type { CircleCollider2D, CircleColliderOptions } from "../components/types";

import { ComponentType } from "../types/component-type";
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