import type { GameEntity } from "../base/GameObject";
import { Id } from "../base/Id";
import type { BoxCollider2DType } from "../components";
import { ComponentTypes } from "../components/component-type";
import { CollisionMask } from "../core/collisionMask/types";

import type { BoxColliderOptions } from "./types";


export function BoxCollider2D(gameEntity: GameEntity, options?: BoxColliderOptions): BoxCollider2DType {
    return {
        isColliding: false,
        gameEntity: gameEntity,
        category: ComponentTypes.Collider,
        type: ComponentTypes.BoxCollider2D,
        enabled: true,
        ignoreSelfCollisions: true,
        instanceID: new Id(),
        isTrigger: false,
        collisionMask: CollisionMask.DEFAULT,
        center: { x: 0, y: 0, z: 0 },
        size: { x: 0.5, y: 0.5, z: 0 },
        ...options
    }
}