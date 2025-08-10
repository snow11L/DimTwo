import type { GameEntity } from "../base/GameEntity";
import { ECSComponent } from "../ecs/ECSComponent";
import { ECSSystem } from "../ecs/ECSSystem";
import { GenericManager } from "../managers/generic_manager";
import type { Mat4 } from "../math/mat4/Mat4";
import { type GLVAO } from "../webgl/mesh_gl";

export class Scene {

    public name: string;
    public readonly ECSComponents: ECSComponent;
    public readonly ECSSystems: ECSSystem;
    public readonly entitiesById: GenericManager<number, GameEntity>;
    public readonly entitiesByName: GenericManager<string, GameEntity>;
    public readonly mat4: GenericManager<number, Mat4>;
    public readonly vao: GenericManager<number, GLVAO>;

    constructor(name: string) {
        this.name = name;
        this.ECSComponents = new ECSComponent();
        this.ECSSystems = new ECSSystem();
        this.entitiesById = new GenericManager("EntitiesByIdManager");
        this.entitiesByName = new GenericManager("EntitiesManager");
        this.mat4 = new GenericManager("Matrix Manager");
        this.vao = new GenericManager("VAO Manager");
    }


    public addToScene(scene: Scene, entity: GameEntity) {
        for (const component of entity.components) {
            scene.ECSComponents.addComponent(entity, component);
        }
    }
}