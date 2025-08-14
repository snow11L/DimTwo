import type { Engine } from "../../Engine";
import type { GameEntity } from "../base/GameEntity";
import { ComponentManager } from "../managers/ComponentManager";
import { EngineSystem, EngineSystemManager } from "../managers/EngineSystemManager";
import { SystemManager } from "../managers/SystemManager";

export class EntityManager {
    private byName: Map<string, GameEntity> = new Map();
    private byId: Map<number, GameEntity> = new Map();
    private byTag: Map<string, Set<GameEntity>> = new Map();

    add(entity: GameEntity) {

        const id = entity.id.getValue();
        if (this.byId.has(id) || this.byName.has(entity.name)) {
            throw new Error(`Entity with same ID or name already exists`);
        }
        this.byId.set(id, entity);
        this.byName.set(entity.name, entity);

        if (!this.byTag.has(entity.tag)) {
            this.byTag.set(entity.tag, new Set());
        }
        this.byTag.get(entity.tag)!.add(entity);
    }

    remove(entity: GameEntity) {
        const id = entity.id.getValue();
        this.byId.delete(id);
        this.byName.delete(entity.name);

        for (const tagSet of this.byTag.values()) {
            tagSet.delete(entity);
        }
    }

    getById(id: number) {
        return this.byId.get(id);
    }

    getByName(name: string) {
        return this.byName.get(name);
    }

    getByTag(tag: string): GameEntity | null {
        return this.byTag.get(tag)?.values().next().value ?? null;
    }

}



export class Scene {
    public name: string;
    public components: ComponentManager = new ComponentManager();
    public systems: SystemManager = new SystemManager();
    public entities: EntityManager = new EntityManager();

    public usedSystems: EngineSystem[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public addEntity(entity: GameEntity) {
        this.entities.add(entity);
        for (const component of entity.components) {
            this.components.addComponent(entity, component);
        }
    }

    public useSystem(systemType: EngineSystem) {
        this.usedSystems.push(systemType);
    }

    public load(engine: Engine) {

        for (const system of this.usedSystems) {
            let systemInstance = this.systems.getSystem(system);
            if (systemInstance) return systemInstance;

            systemInstance = EngineSystemManager.create(system);
            if (!systemInstance) throw new Error(`System ${EngineSystem[system]} could not be created`);

            systemInstance.setScene(this);
            systemInstance.setEngine(engine);
            this.systems.addSystem(system, systemInstance);
        }
    }
}