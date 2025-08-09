import { ComponentTypes } from "../components/component-type";
import type { SpriteRender } from "../components/render/spriteRender/SpriteRender";
import type { TextMeshXComponent } from "../components/render/textMesh/TextRender";
import type { Component } from "../core/base/Component";
import type { GameEntity } from "../core/base/GameEntity";
import { ComponentState } from "../core/ecs";
import { Scene } from "../core/resources/scene/scene";


export function get_textRender(gameEntity: GameEntity): TextMeshXComponent | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ComponentState.getComponent<TextMeshXComponent>(
        scene.components,
        gameEntity,
        ComponentTypes.TextMesh
    );
}

export function get_category<T extends Component>(category: string): T[] {
    const scene = Scene.getCurrentScene();
    if (scene == null) return [];

    return ComponentState.getComponentsByCategory<T>(
        scene.components,
        category
    );
}


export function get_type<T extends Component>(type: string): T[] {
    const scene = Scene.getCurrentScene();
    if (scene == null) return [];

    return ComponentState.getComponentsByType<T>(
        scene.components,
        type
    );
}

export function get_component<T extends Component>(entity: GameEntity, type: string): T | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ComponentState.getComponent<T>(
        scene.components,
        entity,
        type
    );
}

export function get_sprite_render(gameEntity: GameEntity): SpriteRender | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ComponentState.getComponent<SpriteRender>(
        scene.components,
        gameEntity,
        ComponentTypes.SpriteRender
    );
}

