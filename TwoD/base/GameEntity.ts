import type { Component } from "./Component";
import type { Entity } from "./Entity";

export interface GameEntityType extends Entity {
    tag: string;
    active: boolean;
    name: string;
    parent: GameEntityType | null;
    components: Component[];
}


export function addComponents(entity: GameEntityType, ...components: Component[]) {
    for (const component of components) {
        entity.components.push(component);
    }
}

export const GameEntityType = {
    addComponents
}