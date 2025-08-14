
import type { GameEntity } from "../../../core/base/GameEntity";
import { Mat4 } from "../../../core/math/Mat4";
import type { Scene } from "../../../core/scene/scene";
import type { Engine } from "../../../Engine";
import { ComponentGroup, ComponentType } from "../../components/component-type";
import { Camera } from "../../components/render/camera/Camera";
import type { SpriteRender } from "../../components/render/spriteRender/SpriteRender";
import { Transform } from "../../components/spatial/transform/Transform";
import type { Shader } from "../shader/Shader";
import { ShaderSystem } from "../shader/ShaderSystem";

export class SimpleShaderSystem extends ShaderSystem {

    global(engine: Engine, scene: Scene, shader: Shader) {
        const allCameras = scene.components.getAllByGroup<Camera>(ComponentGroup.Camera);
        if (allCameras.length == 0) return;
        const camera = allCameras[0];

        const cameraTransform = scene.components.getComponent<Transform>(camera.getGameEntity(), ComponentType.Transform);
        if (!cameraTransform) return;

        const viewMatrix = camera.viewMatrix;
        Mat4.createTR(viewMatrix, cameraTransform.position, cameraTransform.rotation);
        shader.shader_set_uniform_mat4("uView", viewMatrix.data);

        const projectionMatrix = camera.projection;
        Mat4.projection(projectionMatrix, camera.fov, window.innerWidth / window.innerHeight, camera.near, camera.far)
        shader.shader_set_uniform_mat4("uProjection", projectionMatrix.data);
    }

    local(engine: Engine, entity: GameEntity, scene: Scene, shader: Shader) {

        const transform = scene.components.getComponent<Transform>(entity, ComponentType.Transform);
        if (!transform) return;

        const spriteRender = scene.components.getComponent<SpriteRender>(entity, ComponentType.SpriteRender);
        if (!spriteRender) return;


        const modelMatrix = transform.modelMatrix;


        Mat4.compose(modelMatrix, transform.position, transform.rotation, transform.scale);
        shader.shader_set_uniform_mat4("uModel", modelMatrix.data);

        shader.shader_set_uniform_4f(
            "uColor",
            spriteRender.color.r,
            spriteRender.color.g,
            spriteRender.color.b,
            spriteRender.color.a,
        );
    }
}