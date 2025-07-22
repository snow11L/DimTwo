import type { Component } from "../base/Component";
import type { GameEntityType } from "../base/GameEntity";
import type { SpriteRenderType } from "../components";

import type { TextMeshXComponent } from "../components/render/textMesh/TextRender";
import { ComponentState } from "../ecs";
import { Scene } from "../resources/scene/scene";
import { ComponentType } from "../types/component-type";


export function get_textRender(gameEntity: GameEntityType): TextMeshXComponent | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ComponentState.getComponent<TextMeshXComponent>(
        scene.components,
        gameEntity,
        ComponentType.TextMesh
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

export function get_component<T extends Component>(entity: GameEntityType, type: string): T | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ComponentState.getComponent<T>(
        scene.components,
        entity,
        type
    );
}

export function get_sprite_render(gameEntity: GameEntityType): SpriteRenderType | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ComponentState.getComponent<SpriteRenderType>(
        scene.components,
        gameEntity,
        ComponentType.SpriteRender
    );
}

