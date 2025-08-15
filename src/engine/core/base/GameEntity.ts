import type { Component } from "./Component";
import { Entity } from "./Entity";

export interface GameEntityOptions {
    name?: string;
    tag?: string;
    active?: boolean;
    parent?: GameEntity | null;
    components?: Component[];
}

export class GameEntity extends Entity {
    tag: string;
    active: boolean;
    name: string;
    parent: GameEntity | null;

    constructor(options: GameEntityOptions = {}) {
        super();
        this.name = options.name ?? "";
        this.tag = options.tag ?? "";
        this.active = options.active ?? true;
        this.parent = options.parent ?? null;
    }
}
