import { ECS } from "../../../api/TwoD";
import { createGenericManager, type GenericManager } from "../../managers/generic_manager";
import type { Mat4 } from "../../math/mat4/mat4";
import type { GameEntity } from "../../types/EngineEntity";
import { type GLVAO } from "../../webgl/mesh_gl";
import { createComponentState, type ECSComponentState } from "../ecs/component";
import { createSystemState, type ECSSystemState } from "../ecs/system";


export interface Scene {
    name: string;
    readonly components: ECSComponentState;
    readonly systems: ECSSystemState;

    readonly entitiesById: GenericManager<number, GameEntity>;
    readonly entitiesByName: GenericManager<string, GameEntity>;
    readonly mat4: GenericManager<number, Mat4>;
    readonly vao: GenericManager<number, GLVAO>;
}

let current: Scene | null = null;

function getCurrentScene() {

    if(!current) {
        throw new Error("scena nao atribuida")
    }
    return current;
}

function setCurrentScene(scene: Scene) {
    return current = scene;
}

function addToScene(scene: Scene, entity: GameEntity) {
    for (const component of entity.components) {
        ECS.Component.addComponent(scene.components, entity, component);
    }
}

export function create(name: string): Scene {
    return {
        name,
        components: createComponentState(),
        systems: createSystemState(),
        entitiesById: createGenericManager<number, GameEntity>("game_entity_by_id_manager"),
        entitiesByName: createGenericManager<string, GameEntity>("game_entity_by_name_manager"),
        mat4: createGenericManager<number, Mat4>("mat4_manager"),
        vao: createGenericManager<number, GLVAO>("vao_manager"),
    };
}


export const Scene = {
    create,
    getCurrentScene,
    setCurrentScene,
    addToScene
}
