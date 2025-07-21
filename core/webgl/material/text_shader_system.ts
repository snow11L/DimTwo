import { ComponentType } from "../../../engine/enums";
import { generic_manager_get } from "../../managers/generic_manager";
import { mat4_create_TR, mat4_create_TRS } from "../mat4";
import type { ShaderSystem } from "../system/shader_system";
import type { Vec3 } from "../vec3";
import type { Material } from "./material";
import { shader_set_uniform_2f, shader_set_uniform_4f, shader_set_uniform_mat4, shader_set_uniform_texture } from "../shader/shader_uniforms";
import { get_category, get_sprite_render, get_textRender, get_transform } from "../../components/get_component";
import { ENGINE } from "../../../engine/engine.manager";
import { EasyGetter } from "../../managers/EasyGetters";

export function textShaderSystem(material: Material): ShaderSystem {
    const shader = generic_manager_get(ENGINE.MANAGER.SHADER, material.shaderName);
    if (!shader) throw new Error(`Shader ${material.shaderName} not found in SHADER_MANAGER.`);

    return {
        global() {
            const cameras = get_category(ComponentType.CAMERA);
            if (cameras.length === 0) return;
            const camera = cameras[0];

            const transform = get_transform(camera.gameEntity);
            if (transform == null) return;

            const viewMatrix = generic_manager_get(ENGINE.MANAGER.MAT4, transform.instance)!;
            mat4_create_TR(viewMatrix, transform.position, transform.rotation);
            shader_set_uniform_mat4(shader, "uView", viewMatrix.value);

            const projectionMatrix = generic_manager_get(ENGINE.MANAGER.MAT4, camera.instance)!;
            shader_set_uniform_mat4(shader, "uProjection", projectionMatrix.value);
        },

        local(gameEntity) {

            const transform = get_transform(gameEntity);
            if (!transform) return;

            const modelMatrix = EasyGetter.getMat4(transform.instance)!;

            mat4_create_TRS(
                modelMatrix,
                transform.position,
                transform.rotation,
                transform.scale,

            );

            shader_set_uniform_mat4(shader, "uModel", modelMatrix.value);

            const textRender = get_textRender(gameEntity);
            if(textRender == null) return;
            shader_set_uniform_4f(shader, "uColor", textRender.color.r, textRender.color.g, textRender.color.b, textRender.color.a);

            const texture = generic_manager_get(ENGINE.MANAGER.TEXTURE, textRender.font);
            if(!texture) return;
           
            shader_set_uniform_texture(shader, "uTexture", texture, 0);
        },

    };
}
