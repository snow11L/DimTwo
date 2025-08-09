import type { Component } from "../../base/Component";
import type { GameEntity } from "../../base/GameEntity";


export class ECSComponent {
    readonly persistent: Map<string, Map<GameEntity, Component>> = new Map();
    readonly transient: Map<string, Map<GameEntity, Component>> = new Map();
    readonly category: Map<string, Set<Component>> = new Map();

    public addToCategory(component: Component): void {
        if (!component.category) return;
        if (!this.category.has(component.category)) {
            this.category.set(component.category, new Set());
        }
        this.category.get(component.category)!.add(component);
    }

    public removeFromCategory(component: Component): void {
        if (!component.category) return;
        const set = this.category.get(component.category);
        if (set) {
            set.delete(component);
            if (set.size === 0) {
                this.category.delete(component.category);
            }
        }
    }

    public addComponent<T extends Component>(
        entity: GameEntity,
        component: T,
        persistent = true
    ): void {
        const target = persistent ? this.persistent : this.transient;
        if (!target.has(component.type)) {
            target.set(component.type, new Map());
        }
        console.log(component)
        component.setGameEntity(entity);

        target.get(component.type)!.set(entity, component);
        this.addToCategory(component);
    }

    public getComponent<T extends Component>(
        entity: GameEntity,
        type: string
    ): T | null {
        return (
            this.persistent.get(type)?.get(entity) ??
            this.transient.get(type)?.get(entity) ??
            null
        ) as T | null;
    }

    public hasComponent(entity: GameEntity, type: string): boolean {
        return (
            this.persistent.get(type)?.has(entity) ??
            this.transient.get(type)?.has(entity) ??
            false
        );
    }

    public removeComponent(entity: GameEntity, type: string): void {
        for (const source of [this.persistent, this.transient]) {
            const component = source.get(type)?.get(entity);
            if (component) {
                this.removeFromCategory(component);
                source.get(type)!.delete(entity);
            }
        }
    }

    public getComponentsByType<T extends Component>(type: string): T[] {
        return [
            ...(this.persistent.get(type)?.values() ?? []),
            ...(this.transient.get(type)?.values() ?? []),
        ] as T[];
    }

    public getComponentsByCategory<T extends Component>(category: string): T[] {
        return Array.from(this.category.get(category) ?? []) as T[];
    }

    public destroyEntityAndComponents(
        entity: GameEntity
    ): void {

        for (const [_, map] of this.persistent.entries()) {
            const component = map.get(entity);
            if (component) {
                this.removeFromCategory(component);
                map.delete(entity);
            }
        }


        for (const [_, map] of this.transient.entries()) {
            const component = map.get(entity);
            if (component) {
                this.removeFromCategory(component);
                map.delete(entity);
            }
        }
    }
}