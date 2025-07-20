import type { ECSComponentState } from "../ecs/component";
import type { ECSSystemState } from "../ecs/system";

export interface Scene {
    name: string;
    readonly COMPONENT_STATE: ECSComponentState;
    readonly SYSTEM_STATE: ECSSystemState;
}

const scenes: Map<string, Scene> = new Map();
const current: string = "default";

function getCurrentScene() {
    return scenes.get(current) ?? null;
}


export const Scene = {
    getCurrentScene
}
