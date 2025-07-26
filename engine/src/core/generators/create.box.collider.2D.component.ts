import type { GameEntityType } from "../base/gameEntity/types";
import type { BoxCollider2DType } from "../components";
import { ComponentTypes } from "../components/component-type";
import { CollisionMask } from "../core/collisionMask/types";

import { createIncrementalId } from "./create.incremental.id";
import type { BoxColliderOptions } from "./types";


export function BoxCollider2D(gameEntity: GameEntityType, options?: BoxColliderOptions): BoxCollider2DType {
    return {
        isColliding: false,
        gameEntity: gameEntity,
        category: ComponentTypes.Collider,
        type: ComponentTypes.BoxCollider2D,
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