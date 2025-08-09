import { ComponentTypes } from "../components/component-type";
import type { SpriteRender } from "../components/render/spriteRender/SpriteRender";
import type { Component } from "../core/base/Component";
import type { GameEntity } from "../core/base/GameEntity";
import { Scene } from "../core/resources/scene/scene";

export function get_category<T extends Component>(category: string): T[] {
    const scene = Scene.getCurrentScene();
    if (scene == null) return [];

    return scene.ECSComponents.getComponentsByCategory<T>(
        category
    );
}


export function get_type<T extends Component>(type: string): T[] {
    const scene = Scene.getCurrentScene();
    if (scene == null) return [];

    return scene.ECSComponents.getComponentsByType<T>(
        type
    );
}

export function get_component<T extends Component>(entity: GameEntity, type: string): T | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return scene.ECSComponents.getComponent<T>(
        entity,
        type
    );
}

export function get_sprite_render(gameEntity: GameEntity): SpriteRender | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return scene.ECSComponents.getComponent<SpriteRender>(
        gameEntity,
        ComponentTypes.SpriteRender
    );
}

