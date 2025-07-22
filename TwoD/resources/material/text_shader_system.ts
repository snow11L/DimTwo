import { ComponentType } from "../../../api/enums";
import { Transform } from "../../components";
import { get_category, get_textRender } from "../../generators/get_component";
import { EasyGetter } from "../../managers/EasyGetters";
import { ENGINE } from "../../managers/engine.manager";
import { generic_manager_get } from "../../managers/generic_manager";
import { mat4_create_TR, mat4_create_TRS } from "../../math/mat4/mat4";
import { shader_set_uniform_4f, shader_set_uniform_mat4, shader_set_uniform_texture } from "../shader/shader_uniforms";
import type { ShaderSystem } from "../shader/ShaderSystem";
import type { Material } from "./material";

export function textShaderSystem(material: Material): ShaderSystem {
    const shader = generic_manager_get(ENGINE.MANAGER.SHADER, material.shaderName);
    if (!shader) throw new Error(`Shader ${material.shaderName} not found in SHADER_MANAGER.`);

    return {
        global() {
            const cameras = get_category(ComponentType.Camera);
            if (cameras.length === 0) return;
            const camera = cameras[0];

            const transform = Transform.getTransform(camera.gameEntity);
            if (transform == null) return;

            const viewMatrix = EasyGetter.getMat4(transform.instanceID)!;
            mat4_create_TR(viewMatrix, transform.position, transform.rotation);
            shader_set_uniform_mat4(shader, "uView", viewMatrix.value);

            const projectionMatrix =  EasyGetter.getMat4(camera.instanceID)!;
            shader_set_uniform_mat4(shader, "uProjection", projectionMatrix.value);
        },

        local(gameEntity) {

            const transform = Transform.getTransform(gameEntity);
            if (!transform) return;

            const modelMatrix = EasyGetter.getMat4(transform.instanceID)!;

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
