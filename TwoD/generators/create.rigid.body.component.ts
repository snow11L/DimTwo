import type { GameEntity } from "../base/GameEntity";
import type { RigidBody2DType, RigidBodyOptions } from "../components";
import { ComponentType } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";

export function RigidBody2D(
    gameEntity: GameEntity,
    options: RigidBodyOptions = {}
): RigidBody2DType {
    return {
        instanceID: createIncrementalId(),
        type: ComponentType.RigidBody2D,
        category: ComponentType.RigidBody2D,
        gameEntity,
        mass: 1,
        velocity: { x: 0, y: 0 },
        acceleration: { x: 0, y: 0 },
        drag: 0.01,
        gravityScale: 100,
        isStatic: false,
        useGravity: true,
        enabled: true,
        ...options,
    };
}
