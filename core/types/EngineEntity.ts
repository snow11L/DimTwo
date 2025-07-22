import type { Component } from "../base/Component";

export interface EngineEntity {
    readonly id: number;
}

export interface GameEntity extends EngineEntity {
    tag: string;
    active: boolean;
    name: string;
    parent: GameEntity | null;
    components: Component[];
}


export function addComponents(entity: GameEntity, ...components: Component[]) {
    for (const component of components) {
        entity.components.push(component);
    }
}

export const GameEntity = {
    addComponents
}