import { ENGINE } from "../../api/engine.manager";
import { ECS } from "../../api/TwoD";
import type { Component } from "../components/component/component";
import type { SpriteRenderComponent } from "../components/sprite-render";
import { Scene } from "../components/scene/scene";
import type { TextMeshXComponent } from "../components/text-mesh/TextRender";
import type { TransformComponent } from "../components/transform";
import { generic_manager_get } from "../managers/generic_manager";
import { ComponentType } from "../types/component-type";
import type { GameEntity } from "../types/EngineEntity";
import type { Mat4 } from "../math/mat4/mat4";
import type { CameraComponent } from "../components/camera";

export function get_transform(gameEntity: GameEntity): TransformComponent | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ECS.Component.getComponent<TransformComponent>(
        scene.COMPONENT_STATE,
        gameEntity,
        ComponentType.Transform
    );
}

export function get_textRender(gameEntity: GameEntity): TextMeshXComponent | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ECS.Component.getComponent<TextMeshXComponent>(
        scene.COMPONENT_STATE,
        gameEntity,
        ComponentType.TextMesh
    );
}

export function get_camera(gameEntity: GameEntity): CameraComponent | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ECS.Component.getComponent<CameraComponent>(
        scene.COMPONENT_STATE,
        gameEntity,
        ComponentType.Camera
    );
}

export function get_category<T extends Component>(category: string): T[] {
    const scene = Scene.getCurrentScene();
    if (scene == null) return [];

    return ECS.Component.getComponentsByCategory<T>(
        scene.COMPONENT_STATE,
        category
    );
}


export function get_type<T extends Component>(type: string): T[] {
    const scene = Scene.getCurrentScene();
    if (scene == null) return [];

    return ECS.Component.getComponentsByType<T>(
        scene.COMPONENT_STATE,
        type
    );
}

export function get_component<T extends Component>(entity: GameEntity, type: string): T | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ECS.Component.getComponent<T>(
        scene.COMPONENT_STATE,
        entity,
        type
    );
}

export function get_sprite_render(gameEntity: GameEntity): SpriteRenderComponent | null {
    const scene = Scene.getCurrentScene();
    if (scene == null) return null;

    return ECS.Component.getComponent<SpriteRenderComponent>(
        scene.COMPONENT_STATE,
        gameEntity,
        ComponentType.SpriteRender
    );
}

export function get_mat4(id: number): Mat4 | null {
    return generic_manager_get(ENGINE.MANAGER.MAT4, id);
}
