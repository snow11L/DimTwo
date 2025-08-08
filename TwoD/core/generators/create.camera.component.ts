import type { GameEntity } from "../base/GameObject";
import { Id } from "../base/Id";
import type { CameraType } from "../components";
import { ComponentTypes } from "../components/component-type";

export function Camera(gameEntity: GameEntity) {
    const camera: CameraType = {
        category: ComponentTypes.Camera,
        gameEntity: gameEntity,
        instanceID: new Id(),
        type: ComponentTypes.Camera,
        enabled: true,
        aspec: 1,
        near: 0.01,
        far: 100,
        fov: 90
    };
  return camera;
}
