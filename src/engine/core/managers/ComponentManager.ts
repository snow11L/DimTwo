import type { IComponentManager } from "../../interfaces/IComponentManager";
import type { ComponentGroup, ComponentType } from "../../modules/enums/ComponentType";
import type { Component } from "../base/Component";
import type { GameEntity } from "../base/GameEntity";

export class ComponentManager implements IComponentManager {
    private readonly data: Map<ComponentType, Map<number, Component>> = new Map();
    private readonly group: Map<ComponentGroup, Set<Component>> = new Map();

    addComponent(entity: GameEntity, component: Component): boolean {

        const type = component.type;
        if (!this.data.has(type)) this.data.set(type, new Map());

        const typeMap = this.data.get(type)!;
        if (typeMap.has(entity.id.getValue())) {
            console.warn(`GameEntity ${entity.id.getValue()} already has a component of type ${type}`);
            return false;
        }

        typeMap.set(entity.id.getValue(), component);

        const group = component.group;
        if (group) {
            if (!this.group.has(group)) this.group.set(group, new Set());
            this.group.get(group)!.add(component);
        }

        component.setGameEntity(entity);
        return true;
    }

    removeComponent(entity: GameEntity, type: ComponentType): boolean {
        const typeMap = this.data.get(type);
        if (!typeMap || !typeMap.has(entity.id.getValue())) return false;

        const component = typeMap.get(entity.id.getValue())!;
        typeMap.delete(entity.id.getValue());

        const group = component.group;
        if (group && this.group.has(group)) {
            this.group.get(group)!.delete(component);
        }

        return true;
    }

    getComponent<T extends Component>(entity: GameEntity, type: ComponentType): T | null {
        const typeMap = this.data.get(type);
        return (typeMap?.get(entity.id.getValue()) as T) ?? null;
    }

    getAllComponents<T extends Component>(entity: GameEntity, type: ComponentType): T[] {
        const comp = this.getComponent<T>(entity, type);
        return comp ? [comp] : [];
    }

    getAllOfType<T extends Component>(type: ComponentType): T[] {
        const typeMap = this.data.get(type);
        return typeMap ? Array.from(typeMap.values()) as T[] : [];
    }

    getAllByGroup<T extends Component>(group: ComponentGroup): T[] {
        return Array.from(this.group.get(group) ?? []) as T[];
    }

    getAll(): Component[] {
        const allComponents: Component[] = [];
        for (const typeMap of this.data.values()) {
            allComponents.push(...typeMap.values());
        }
        return allComponents;
    }

    getAllComponentsForEntity(entity: GameEntity): Component[] {
        const components: Component[] = [];

        for (const typeMap of this.data.values()) {
            const component = typeMap.get(entity.id.getValue());
            if (component) components.push(component);
        }

        return components;
    }

    public clear() {
        this.data.clear();
        this.group.clear();
    }
}