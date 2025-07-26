
import type { GameEntityType } from "../../base/gameEntity/types";
import { CollisionMatrix, type CollisionMatrixType } from "../../components";
import { ComponentState, type ComponentStateType, type SystemStateType } from "../../ecs";
import { createComponentState } from "../../ecs/componentState";
import { createSystemState } from "../../ecs/systemState";
import { createGenericManager, type GenericManager } from "../../managers/generic_manager";
import type { Mat4Type } from "../../math/mat4/types";
import { type GLVAO } from "../../webgl/mesh_gl";


export interface Scene {
    name: string;
    readonly components: ComponentStateType;
    readonly systems: SystemStateType;
    readonly collisionMatrix: CollisionMatrixType;
    readonly entitiesById: GenericManager<number, GameEntityType>;
    readonly entitiesByName: GenericManager<string, GameEntityType>;
    readonly mat4: GenericManager<number, Mat4Type>;
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

function addToScene(scene: Scene, entity: GameEntityType) {
    for (const component of entity.components) {
        ComponentState.addComponent(scene.components, entity, component);
    }
}

export function create(name: string): Scene {
    return {
        name,
        collisionMatrix: CollisionMatrix.createCollisionMatrix(32),
        components: createComponentState(),
        systems: createSystemState(),
        entitiesById: createGenericManager<number, GameEntityType>("game_entity_by_id_manager"),
        entitiesByName: createGenericManager<string, GameEntityType>("game_entity_by_name_manager"),
        mat4: createGenericManager<number, Mat4Type>("mat4_manager"),
        vao: createGenericManager<number, GLVAO>("vao_manager"),
    };
}


export const Scene = {
    create,
    getCurrentScene,
    setCurrentScene,
    addToScene
}
