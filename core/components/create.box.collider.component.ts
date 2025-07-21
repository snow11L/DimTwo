import { CollisionMask } from "../collider/types/LayerMask";
import type { AABB2D, BoxColliderOptions } from "../gears/collider/box/BoxCollider";
import { ComponentType } from "../types/component-type";
import type { GameEntity } from "../types/EngineEntity";
import { createIncrementalId } from "./create.incremental.id";

export function createBoxColliderComponent(gameEntity: GameEntity, options?: BoxColliderOptions): AABB2D {
    return {
        isColliding: false,
        gameEntity: gameEntity,
        category: ComponentType.COLLIDER,
        type: ComponentType.BOX_COLLIDER,
        enabled: true,
        ignoreSelfCollisions: true,
        instance: createIncrementalId(),
        isTrigger: false,
        collisionMask: CollisionMask.DEFAULT,
        center: { x: 0, y: 0, z: 0 },
        size: { x: 0.5, y: 0.5, z: 0 },
        ...options
    }
}