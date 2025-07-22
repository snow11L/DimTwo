import type { CameraComponent } from "../components/render/camera";
import { ComponentType } from "../types/component-type";
import type { GameEntity } from "../types/EngineEntity";
import { createIncrementalId } from "./create.incremental.id";

export function createCameraComponent(gameEntity: GameEntity) {
    const camera: CameraComponent = {
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
