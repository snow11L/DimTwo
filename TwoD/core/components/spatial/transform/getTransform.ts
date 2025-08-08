import type { GameEntity } from "../../../base/gameEntity/types";
import { ComponentState } from "../../../ecs";
import { Scene } from "../../../resources/scene/scene";
import { ComponentTypes } from "../../component-type";
import type { TransformType } from "./types";

export function getTransform(gameEntity: GameEntity): TransformType | null {
    const scene = Scene.getCurrentScene();

    return ComponentState.getComponent<TransformType>(
        scene.components,
        gameEntity,
        ComponentTypes.Transform
    );
}