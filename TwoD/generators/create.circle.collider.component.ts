import type { GameEntityType } from "../base/gameEntity/types";
import type { CircleCollider2DType, CircleColliderOptions } from "../components";
import { CollisionMask } from "../components/physics/collisionMatrix/CollisionMaskTypes";

import { ComponentType } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";

export function CircleCollider2D(gameEntity: GameEntityType, options?: CircleColliderOptions): CircleCollider2DType {
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