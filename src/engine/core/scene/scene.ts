import { Camera } from "../../modules/components/render/Camera";
import { ComponentType } from "../../modules/enums/ComponentType";
import { Component } from "../base/Component";
import type { GameEntity } from "../base/GameEntity";
import { ComponentManager } from "../managers/ComponentManager";
import { EntityManager } from "../managers/EntityManager";

export class Scene {
    public name: string;
    public components: ComponentManager = new ComponentManager();
    public entities: EntityManager = new EntityManager();

    private camera: Camera | null = null;
    constructor(name: string) {
        this.name = name;
    }

    public addEntity(entity: GameEntity) {
        this.entities.add(entity);
    }

    public addComponent(entity: GameEntity, component: Component) {
        this.components.addComponent(entity, component);
    }

    private injectedCamera: Camera | null = null;

    public injectCamera(camera: Camera | null) {
        this.injectedCamera = camera;
    }

    public getActiveCamera(): Camera {

        if (this.injectedCamera) return this.injectedCamera;

        if (this.camera && this.camera.enabled) return this.camera;

        const cameras = this.components.getAllOfType<Camera>(ComponentType.Camera);
        const activeCamera = cameras.find(c => c.enabled);

        if (!activeCamera) {
            throw new Error("No active camera found in the scene");
        }

        this.camera = activeCamera;
        return this.camera;
    }

    public clone(): Scene {
        const sceneClone = new Scene(this.name + "_clone");

        for (const entity of this.entities.getAll()) {
            const entityClone = entity.clone();
            sceneClone.addEntity(entityClone);

            for (const component of this.components.getAllComponentsForEntity(entity)) {
                const componentClone = component.clone();
                sceneClone.addComponent(entityClone, componentClone);
            }
        }

        return sceneClone;
    }

    public clear(): void {
        this.components.clear();
        this.entities.clear();
    }
}
