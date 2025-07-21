import { ECS } from "../../../engine/TwoD";
import type { GameEntity } from "../../types/EngineEntity";
import type { ECSComponentState } from "../ecs/component";
import type { ECSSystemState } from "../ecs/system";

export interface Scene {
    name: string;
    readonly COMPONENT_STATE: ECSComponentState;
    readonly SYSTEM_STATE: ECSSystemState;
}


let current: Scene | null = null;

function getCurrentScene() {
    return current;
}

function setCurrentScene(scene: Scene) {
    return current = scene;
}


function addToScene(scene: Scene, entity: GameEntity) {
    for (const component of entity.components) {
        ECS.Component.addComponent(scene.COMPONENT_STATE, entity, component);
    }
}

export const Scene = {
    getCurrentScene,
    setCurrentScene,
    addToScene
}
