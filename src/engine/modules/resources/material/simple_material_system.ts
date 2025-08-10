
import { Mat4 } from "../../../core/math/mat4/Mat4";
import { ResourcesManager } from "../../../global/manager/manager";
import { Camera } from "../../components/render/camera/types";
import { Transform } from "../../components/spatial/transform/Transform";
import { EasyGetter } from "../../EasyGetters";
import { get_sprite_render } from "../../generators/get_component";
import type { ShaderSystem } from "../shader/ShaderSystem";

export function simple_material_system(shaderName: string): ShaderSystem {
    const shader = ResourcesManager.ShaderManager.generic_manager_get(shaderName)!;

    return {

        global() {

            const camera = Camera.getActivedCamera();
            if (!camera) return;

            const transform = Transform.getTransform(camera.getGameEntity());
            if (transform == null) return;

            const viewMatrix = EasyGetter.getMat4(transform.instanceID.getValue())!;
            Mat4.createTR(viewMatrix, transform.position, transform.rotation);
            shader.shader_set_uniform_mat4("uView", viewMatrix.data);

            const projectionMatrix = EasyGetter.getMat4(camera.instanceID.getValue())!;
            shader.shader_set_uniform_mat4("uProjection", projectionMatrix.data);

        },

        local(gameEntity) {

            const transform = Transform.getTransform(gameEntity);
            if (!transform) return;

            const spriteRender = get_sprite_render(gameEntity);
            if (!spriteRender) return;

            const modelMatrix = EasyGetter.getMat4(transform.instanceID.getValue())!;
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
    };
}