import type { Component } from "./Component";
import type { Entity } from "./Entity";

export interface GameEntity extends Entity {
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