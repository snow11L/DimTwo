import type { GameEntityType } from "../base/gameEntity/types";
import type { CircleCollider2DType } from "../components";
import { ComponentTypes } from "../components/component-type";
import { CollisionMask } from "../core/collisionMask/types";
import { createIncrementalId } from "./create.incremental.id";
import type { CircleColliderOptions } from "./types";

export function CircleCollider2D(gameEntity: GameEntityType, options?: CircleColliderOptions): CircleCollider2DType {
    return {
        gameEntity: gameEntity,
        category: ComponentTypes.Collider,
        type: ComponentTypes.CircleCollider2D,
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