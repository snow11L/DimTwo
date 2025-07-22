import { ECS } from "../../api/TwoD";
import type { Component } from "../base/Component";
import type { GameEntity } from "../base/GameEntity";
import type { CameraComponent } from "../components/render/camera";
import type { TextMeshXComponent } from "../components/render/textMesh/TextRender";
import type { Transform } from "../components/transform";
import type { SpriteRenderComponent } from "../components/types";
import { Scene } from "../resources/scene/scene";
import { ComponentType } from "../types/component-type";

export function get_transform(gameEntity: GameEntity): Transform | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ECS.Component.getComponent<Transform>(
        scene.components,
        gameEntity,
        ComponentType.Transform
    );
}

export function get_textRender(gameEntity: GameEntity): TextMeshXComponent | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ECS.Component.getComponent<TextMeshXComponent>(
        scene.components,
        gameEntity,
        ComponentType.TextMesh
    );
}

export function get_camera(gameEntity: GameEntity): CameraComponent | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ECS.Component.getComponent<CameraComponent>(
        scene.components,
        gameEntity,
        ComponentType.Camera
    );
}

export function get_category<T extends Component>(category: string): T[] {
    const scene = Scene.getCurrentScene();
    if (scene == null) return [];

    return ECS.Component.getComponentsByCategory<T>(
        scene.components,
        category
    );
}


export function get_type<T extends Component>(type: string): T[] {
    const scene = Scene.getCurrentScene();
    if (scene == null) return [];

    return ECS.Component.getComponentsByType<T>(
        scene.components,
        type
    );
}

export function get_component<T extends Component>(entity: GameEntity, type: string): T | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ECS.Component.getComponent<T>(
        scene.components,
        entity,
        type
    );
}

export function get_sprite_render(gameEntity: GameEntity): SpriteRenderComponent | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ECS.Component.getComponent<SpriteRenderComponent>(
        scene.components,
        gameEntity,
        ComponentType.SpriteRender
    );
}

