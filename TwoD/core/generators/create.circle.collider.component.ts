import type { GameEntity } from "../base/GameObject";
import { Id } from "../base/Id";
import type { CircleCollider2DType } from "../components";
import { ComponentTypes } from "../components/component-type";
import { CollisionMask } from "../core/collisionMask/types";
import type { CircleColliderOptions } from "./types";

export function CircleCollider2D(gameEntity: GameEntity, options?: CircleColliderOptions): CircleCollider2DType {
    return {
        gameEntity: gameEntity,
        category: ComponentTypes.Collider,
        type: ComponentTypes.CircleCollider2D,
        enabled: true,
        ignoreSelfCollisions: true,
        instanceID: new Id(),
        isTrigger: false,
        center: { x: 0, y: 0, z: 0 },
        isColliding: false,
        collisionMask: CollisionMask.DEFAULT,
        radius: 0.5,
        ...options
    }
}