import { ECS } from "../../../../api/TwoD";
import type { GameEntity } from "../../../base/GameEntity";
import { Scene } from "../../../resources/scene/scene";
import { ComponentType } from "../../../types/component-type";
import type { CameraType } from "./types";

export function get_camera(gameEntity: GameEntity): CameraType | null {
    const scene = Scene.getCurrentScene();

    return ECS.Component.getComponent<CameraType>(
        scene.components,
        gameEntity,
        ComponentType.Camera
    );
}
