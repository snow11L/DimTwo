import type { TransformComponent, TransformOptions } from "../components/transform";
import { ComponentType } from "../types/component-type";
import type { GameEntity } from "../types/EngineEntity";
import { createIncrementalId } from "./create.incremental.id";

export function createTransformComponent(
    entity: GameEntity,
    options?: TransformOptions
): TransformComponent {

    const transform: TransformComponent = {
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