import type { GameEntity } from "../../base/GameEntity";
import { createCollisionMatrix } from "../../core/collisionMatrix";
import type { CollisionMatrixType } from "../../core/collisionMatrix/types";
import { ECSComponent } from "../../ecs/componentState/ECSComponent";
import { ECSSystem } from "../../ecs/ECSSystem";
import { GenericManager } from "../../managers/generic_manager";
import type { Mat4 } from "../../math/mat4/Mat4";

import { type GLVAO } from "../../webgl/mesh_gl";


export interface Scene {
    name: string;
    readonly ECSComponents: ECSComponent;
    readonly ECSSystems: ECSSystem;
    readonly collisionMatrix: CollisionMatrixType;
    readonly entitiesById: GenericManager<number, GameEntity>;
    readonly entitiesByName: GenericManager<string, GameEntity>;
    readonly mat4: GenericManager<number, Mat4>;
    readonly vao: GenericManager<number, GLVAO>;
}

let current: Scene | null = null;

function getCurrentScene() {

    if (!current) {
        throw new Error("scena nao atribuida")
    }
    return current;
}

function setCurrentScene(scene: Scene) {
    return current = scene;
}

function addToScene(scene: Scene, entity: GameEntity) {
    for (const component of entity.components) {
        scene.ECSComponents.addComponent(entity, component);
    }
}

export function create(name: string): Scene {
    return {
        name,
        collisionMatrix: createCollisionMatrix(32),
        ECSComponents: new ECSComponent(),
        ECSSystems: new ECSSystem(),
        entitiesById: new GenericManager<number, GameEntity>("game_entity_by_id_manager"),
        entitiesByName: new GenericManager<string, GameEntity>("game_entity_by_name_manager"),
        mat4: new GenericManager<number, Mat4>("mat4_manager"),
        vao: new GenericManager<number, GLVAO>("vao_manager"),
    };
}


export const Scene = {
    create,
    getCurrentScene,
    setCurrentScene,
    addToScene
}
