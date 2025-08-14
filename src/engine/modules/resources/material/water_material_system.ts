
import { Color } from "../../../core/math/color/color";
import { Mat4 } from "../../../core/math/mat4/Mat4";
import { ResourcesManager } from "../../../global/manager/manager";
import { ComponentType } from "../../components/component-type";
import { Transform } from "../../components/spatial/transform/Transform";
import { EasyGetter } from "../../EasyGetters";
import type { ShaderSystem } from "../shader/ShaderSystem";
import type { MaterialType } from "./types";


export function water_material_system(material: MaterialType): ShaderSystem {
    const shader = ResourcesManager.ShaderManager.get(material.shaderName)!;

    return {
        global() {

            const cameras = get_category(ComponentType.Camera);
            if (cameras.length === 0) return;
            const camera = cameras[0];

            const cameraTransform = Transform.getTransform(camera.getGameEntity());
            if (cameraTransform == null) return;

            const viewMatrix = EasyGetter.getMat4(cameraTransform.instanceID.getValue())!;
            Mat4.createTR(viewMatrix, cameraTransform.position, cameraTransform.rotation);
            shader.shader_set_uniform_mat4("uView", viewMatrix.data);

            const projectionMatrix = EasyGetter.getMat4(camera.instanceID.getValue())!;
            shader.shader_set_uniform_mat4("uProjection", projectionMatrix.data);

            shader.shader_set_uniform_1f("uTime", performance.now() / 2000);
        },

        local(gameEntity) {

            const transform = Transform.getTransform(gameEntity);
            if (transform == null) return;

            const spriteRender = get_sprite_render(gameEntity);
            if (spriteRender == null) return;

            const modelMatrix = EasyGetter.getMat4(transform.instanceID.getValue())!;
            Mat4.compose(modelMatrix, transform.position, transform.rotation, transform.scale);
            shader.shader_set_uniform_mat4("uModel", modelMatrix.data);

            spriteRender.color = Color.rgba(1, 161, 253, 1);

            shader.shader_set_uniform_4f(
                "uColor",
                spriteRender.color.r,
                spriteRender.color.g,
                spriteRender.color.b,
                spriteRender.color.a,
            );

            shader.shader_set_uniform_2f("uTileSize", transform.scale.x, transform.scale.y);
            shader.shader_set_uniform_2f("uWorldOffset", transform.position.x, transform.position.y);

            shader.shader_set_uniform_1f("uWaveScale", 1);
        },
    };
}