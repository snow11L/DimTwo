import type { GameEntityType } from "../base";
import type { TransformType } from "../components";
import { ComponentTypes } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";
import type { TransformOptions } from "./types";


export function Transform(
    entity: GameEntityType,
    options?: TransformOptions
): TransformType {

    const transform: TransformType = {
        category: ComponentTypes.Transform,
        instanceID: createIncrementalId(),
        type: ComponentTypes.Transform,
        enabled: true,
        gameEntity: entity,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0, w: 1 },
        scale: { x: 1, y: 1, z: 1 },
        ...options
    }
    return transform;
}