import { TransformLib } from "../..";
import { ComponentTypes } from "../../components/component-type";
import { get_category, get_sprite_render } from "../../generators/get_component";
import { EasyGetter } from "../../managers/EasyGetters";
import { Global } from "../../managers/engine.manager";
import { generic_manager_get } from "../../managers/generic_manager";
import { Color } from "../../math/color/color";
import { Mat4 } from "../../math/mat4/Mat4";
import { shader_set_uniform_1f, shader_set_uniform_2f, shader_set_uniform_4f, shader_set_uniform_mat4 } from "../shader";
import type { ShaderSystem } from "../shader/ShaderSystem";
import type { MaterialType } from "./types";

export function water_material_system(material: MaterialType): ShaderSystem {
    const shader = generic_manager_get(Global.ResourcesManager.ShaderManager, material.shaderName)!;

    return {
        global() {

            const cameras = get_category(ComponentTypes.Camera);
            if (cameras.length === 0) return;
            const camera = cameras[0];

            const cameraTransform =TransformLib.getTransform(camera.gameEntity);
            if (cameraTransform == null) return;

            const viewMatrix = EasyGetter.getMat4(cameraTransform.instanceID.getValue())!;
            Mat4.createTR(viewMatrix, cameraTransform.position, cameraTransform.rotation);
            shader_set_uniform_mat4(shader, "uView", viewMatrix.data);

            const projectionMatrix = EasyGetter.getMat4(camera.instanceID.getValue())!;
            shader_set_uniform_mat4(shader, "uProjection", projectionMatrix.data);

            shader_set_uniform_1f(shader, "uTime", performance.now() / 2000);
        },

        local(gameEntity) {

            const transform =TransformLib.getTransform(gameEntity);
            if (transform == null) return;

            const spriteRender = get_sprite_render(gameEntity);
            if (spriteRender == null) return;

            const modelMatrix = EasyGetter.getMat4(transform.instanceID.getValue())!;
            Mat4.compose(modelMatrix, transform.position, transform.rotation, transform.scale);
            shader_set_uniform_mat4(shader, "uModel", modelMatrix.data);

            spriteRender.color = Color.rgba(1, 161, 253, 1);

            shader_set_uniform_4f(
                shader,
                "uColor",
                spriteRender.color.r,
                spriteRender.color.g,
                spriteRender.color.b,
                spriteRender.color.a,
            );

            shader_set_uniform_2f(shader, "uTileSize", transform.scale.x, transform.scale.y);
            shader_set_uniform_2f(shader, "uWorldOffset", transform.position.x, transform.position.y);

            shader_set_uniform_1f(shader, "uWaveScale", 1);
        },
    };
}