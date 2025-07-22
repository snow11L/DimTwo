import type { GameEntityType } from "../base/GameEntity";
import type { CameraType } from "../components";
import { ComponentType } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";

export function Camera(gameEntity: GameEntityType) {
    const camera: CameraType = {
        category: ComponentType.Camera,
        gameEntity: gameEntity,
        instanceID: createIncrementalId(),
        type: ComponentType.Camera,
        enabled: true,
        aspec: 1,
        near: 0.01,
        far: 100,
        fov: 90
    };
  return camera;
}
