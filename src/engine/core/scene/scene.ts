import type { Component } from "../base/Component";
import type { GameEntity } from "../base/GameEntity";
import { ComponentManager } from "../managers/ComponentManager";

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
    public entities: EntityManager = new EntityManager();

    constructor(name: string) {
        this.name = name;
    }

    public addEntity(entity: GameEntity) {
        this.entities.add(entity);
    }

    public addComponent(entity: GameEntity, component: Component) {
        this.components.addComponent(entity, component);
    }
}