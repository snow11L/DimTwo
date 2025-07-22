import type { GameEntityType } from "../base/gameEntity/types";
import type { RigidBody2DType } from "../components";
import { ComponentTypes } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";
import type { RigidBodyOptions } from "./types";

export function BuildRigidBody2D(
    gameEntity: GameEntityType,
    options: RigidBodyOptions = {}
): RigidBody2DType {
    return {
        instanceID: createIncrementalId(),
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
