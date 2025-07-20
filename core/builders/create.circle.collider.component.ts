import type { CircleColliderComponent, CircleColliderOptions } from "../collider/types/CircleCollider";
import { CollisionMask } from "../collider/types/LayerMask";
import { ComponentType } from "../types/component-type";
import type { GameEntity } from "../types/EngineEntity";
import { createIncrementalId } from "./create.incremental.id";

export function createCircleColliderComponent(gameEntity: GameEntity, options?: CircleColliderOptions): CircleColliderComponent {
    return {
        gameEntity: gameEntity,
        category: ComponentType.COLLIDER,
        type: ComponentType.CIRCLE_COLLIDER,
        enabled: true,
        ignoreSelfCollisions: true,
        instance: createIncrementalId(),
        isTrigger: false,
        center: { x: 0, y: 0, z: 0 },
        isColliding: false,
        collisionMask: CollisionMask.DEFAULT,
        radius: 32,
        ...options
    }
}