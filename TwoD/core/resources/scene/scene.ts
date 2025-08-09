import type { GameEntity } from "../../base/GameEntity";
import { createCollisionMatrix } from "../../core/collisionMatrix";
import type { CollisionMatrixType } from "../../core/collisionMatrix/types";
import { ECSComponent } from "../../ecs/componentState/ECSComponent";
import { ECSSystem } from "../../ecs/ECSSystem";

import { GenericManager } from "../../managers/generic_manager";
import type { Mat4 } from "../../math/mat4/Mat4";

import { type GLVAO } from "../../webgl/mesh_gl";


export class Scene {

    private static current: Scene | null;
    name: string;
    readonly ECSComponents: ECSComponent;
    readonly ECSSystems: ECSSystem;
    readonly collisionMatrix: CollisionMatrixType;
    readonly entitiesById: GenericManager<number, GameEntity>;
    readonly entitiesByName: GenericManager<string, GameEntity>;
    readonly mat4: GenericManager<number, Mat4>;
    readonly vao: GenericManager<number, GLVAO>;

    constructor(name: string) {
        this.name = name;

        this.ECSComponents = new ECSComponent();
        this.ECSSystems = new ECSSystem();
        this.collisionMatrix = createCollisionMatrix(32);
        this.entitiesById = new GenericManager("EntitiesByIdManager");
        this.entitiesByName = new GenericManager("EntitiesManager");
        this.mat4 = new GenericManager("Matrix Manager");
        this.vao = new GenericManager("VAO Manager");
        
  
    }

    public static getCurrentScene() {

        if (!this.current) {
            throw new Error("scena nao atribuida")
        }
        return this.current;
    }

    public static setCurrentScene(scene: Scene) {
        return this.current = scene;
    }

    public addToScene(scene: Scene, entity: GameEntity) {
        for (const component of entity.components) {
            scene.ECSComponents.addComponent(entity, component);
        }
    }



}





