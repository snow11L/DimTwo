import type { GameEntityType } from "../base/gameEntity/types";
import type { CameraType } from "../components";
import { ComponentTypes } from "../components/component-type";
import { createIncrementalId } from "./create.incremental.id";

export function Camera(gameEntity: GameEntityType) {
    const camera: CameraType = {
        category: ComponentTypes.Camera,
        gameEntity: gameEntity,
        instanceID: createIncrementalId(),
        type: ComponentTypes.Camera,
        enabled: true,
        aspec: 1,
        near: 0.01,
        far: 100,
        fov: 90
    };
  return camera;
}
