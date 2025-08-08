import type { GameEntity } from "../base/GameObject";
import { Id } from "../base/Id";
import type { RigidBody2DType } from "../components";
import { ComponentTypes } from "../components/component-type";
import type { RigidBodyOptions } from "./types";

export function BuildRigidBody2D(
    gameEntity: GameEntity,
    options: RigidBodyOptions = {}
): RigidBody2DType {
    return {
        instanceID: new Id(),
        type: ComponentTypes.RigidBody2D,
        category: ComponentTypes.RigidBody2D,
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
