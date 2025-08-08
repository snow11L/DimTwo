import type { GameEntity } from "../base/GameObject";
import { Id } from "../base/Id";
import type { TransformType } from "../components";
import { ComponentTypes } from "../components/component-type";
import type { TransformOptions } from "./types";


export function Transform(
    entity: GameEntity,
    options?: TransformOptions
): TransformType {

    const transform: TransformType = {
        category: ComponentTypes.Transform,
        instanceID: new Id(),
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