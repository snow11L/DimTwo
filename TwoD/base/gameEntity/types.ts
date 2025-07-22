import type { Component } from "../Component";
import type { Entity } from "../Entity";

export interface GameEntityType extends Entity {
    tag: string;
    active: boolean;
    name: string;
    parent: GameEntityType | null;
    components: Component[];
}

