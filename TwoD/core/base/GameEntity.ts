import { ComponentTypes } from "../../modules/components/component-type";
import type { Transform } from "../../modules/components/spatial/transform/Transform";
import { get_component } from "../../modules/generators/get_component";
import type { Component } from "./Component";
import { Entity } from "./Entity";

export class GameEntity extends Entity {
    tag: string;
    active: boolean;
    name: string;
    parent: GameEntity | null;
    components: Component[];

    constructor(
        name: string = "",
        tag: string = "",
        active: boolean = true,
        parent: GameEntity | null = null
    ) {
        super();
        this.name = name;
        this.tag = tag;
        this.active = active;
        this.parent = parent;
        this.components = [];
    }

    static addComponents(entity: GameEntity, ...components: Component[]) {
        for (const component of components) {
            entity.components.push(component);
        }


    }

    public getTransform() {
        const transform = get_component<Transform>(this, ComponentTypes.Transform);
        if (!transform) {
            throw new Error("transform nao atribuida");
        }

        return transform;
    }
}
