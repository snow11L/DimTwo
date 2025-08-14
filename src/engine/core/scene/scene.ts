import type { Engine } from "../../Engine";
import { ResourcesManager } from "../../global/manager/manager";
import { ComponentGroup } from "../../modules/components/component-type";
import { Mesh } from "../../modules/resources/mesh/Mesh";
import type { GameEntity } from "../base/GameEntity";
import { Render } from "../base/Render";
import { ComponentManager } from "../managers/ComponentManager";
import { EngineSystem, EngineSystemManager } from "../managers/EngineSystemManager";
import { GenericManager } from "../managers/generic_manager";
import { SystemManager } from "../managers/SystemManager";


export class Scene {
    public name: string;
    public components: ComponentManager = new ComponentManager();
    public systems: SystemManager = new SystemManager();
    public usedSystems: EngineSystem[] = [];

    // Apenas IDs que a cena usa
    private sceneMat4IDs: Set<number> = new Set();
    private sceneVAOIDs: Set<number> = new Set();

    private engine: Engine | null = null;
    public getEngine() {
        return this.engine;
    }

    public setEngine(engine: Engine) {
        this.engine = engine;
    }

    public readonly entitiesById: GenericManager<number, GameEntity>;
    public readonly entitiesByName: GenericManager<string, GameEntity>;

    constructor(name: string) {
        this.name = name;
        this.entitiesById = new GenericManager("EntitiesByIdManager");
        this.entitiesByName = new GenericManager("EntitiesManager");
    }

    public addEntity(entity: GameEntity) {
        for (const component of entity.components) {
            this.components.addComponent(entity, component);
        }
    }

    public useSystem(systemType: EngineSystem) {
        this.usedSystems.push(systemType);
    }

    public load() {
        if (!this.engine) throw new Error("Engine not set for this scene.");

        // Inicializa sistemas
        for (const system of this.usedSystems) {
            let systemInstance = this.systems.getSystem(system);
            if (systemInstance) return systemInstance;

            systemInstance = EngineSystemManager.create(system);
            if (!systemInstance) throw new Error(`System ${EngineSystem[system]} could not be created`);

            systemInstance.setScene(this);
            systemInstance.setEngine(this.engine);
            this.systems.addSystem(system, systemInstance);
        }

        // Coleta renderers
        const renderers = this.components.getAllByGroup<Render>(ComponentGroup.Render);
        const meshes: Set<Mesh> = new Set<Mesh>();

        for (const render of renderers) {
            const mesh = ResourcesManager.MeshManager.get(render.meshID);
            if (mesh) meshes.add(mesh);
        }

        for (const mesh of meshes) {
            const vao = mesh.createMeshVAO(this.getEngine().gl);
            this.engine.vao.values.set(mesh.instanceID.getValue(), vao);
            this.sceneVAOIDs.add(mesh.instanceID.getValue());
        }
    }

    public releaseResources() {
        if (!this.engine) return;

        for (const id of this.sceneVAOIDs) {
            this.engine.vao.values.delete(id);
        }
        this.sceneVAOIDs.clear();
        this.sceneMat4IDs.clear();
    }

}