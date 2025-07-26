import type { Component } from "../Component";
import type { GameEntityType } from "./types";

export function addComponents(entity: GameEntityType, ...components: Component[]) {
    for (const component of components) {
        entity.components.push(component);
    }
}