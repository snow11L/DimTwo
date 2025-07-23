import { Mathf } from "../..";
import { Camera, Transform } from "../../components";
import { get_sprite_render } from "../../generators/get_component";
import { EasyGetter } from "../../managers/EasyGetters";
import { Global } from "../../managers/engine.manager";
import { generic_manager_get } from "../../managers/generic_manager";
import { shader_set_uniform_4f, shader_set_uniform_mat4 } from "../shader";
import type { ShaderSystem } from "../shader/ShaderSystem";

export function simple_material_system(shaderName: string): ShaderSystem {
    const shader = generic_manager_get(Global.ResourcesManager.ShaderManager, shaderName)!;

    return {

        global() {

            const camera = Camera.getActivedCamera();
            if(!camera) return;

            const transform = Transform.getTransform(camera.gameEntity);
            if (transform == null) return;

            const viewMatrix = EasyGetter.getMat4(transform.instanceID)!;
            Mathf.Mat4.createTR(viewMatrix, transform.position, transform.rotation);
            shader_set_uniform_mat4(shader, "uView", viewMatrix.value);

            const projectionMatrix = EasyGetter.getMat4(camera.instanceID)!;
            shader_set_uniform_mat4(shader, "uProjection", projectionMatrix.value);

        },

        local(gameEntity) {

            const transform = Transform.getTransform(gameEntity);
            if (!transform) return;

            const spriteRender = get_sprite_render(gameEntity);
            if (!spriteRender) return;

            const modelMatrix = EasyGetter.getMat4(transform.instanceID)!;
            Mathf.Mat4.createTRS(modelMatrix, transform.position, transform.rotation, transform.scale);
            shader_set_uniform_mat4(shader, "uModel", modelMatrix.value);

            shader_set_uniform_4f(

                shader,
                "uColor",
                spriteRender.color.r,
                spriteRender.color.g,
                spriteRender.color.b,
                spriteRender.color.a,
            );
        }
    };
}