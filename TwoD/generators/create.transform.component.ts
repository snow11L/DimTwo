import type { GameEntityType } from "../base/gameEntity/types";
import type { TransformOptions, TransformType } from "../components";
import { ComponentType } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";

export function Transform(
    entity: GameEntityType,
    options?: TransformOptions
): TransformType {

    const transform: TransformType = {
        category: ComponentType.Transform,
        instanceID: createIncrementalId(),
        type: ComponentType.Transform,
        enabled: true,
        gameEntity: entity,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0, w: 1 },
        scale: { x: 1, y: 1, z: 1 },
        ...options
    }
    return transform;
}