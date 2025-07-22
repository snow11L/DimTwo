import { Camera, Transform } from "../../components";
import { get_sprite_render } from "../../generators/get_component";
import { EasyGetter } from "../../managers/EasyGetters";
import { ENGINE } from "../../managers/engine.manager";
import { generic_manager_get } from "../../managers/generic_manager";
import { Mat4, mat4_create_TR, mat4_create_TRS } from "../../math/mat4/mat4";
import type { Vec3 } from "../../math/vec3/vec3";
import { shader_set_uniform_2f, shader_set_uniform_4f, shader_set_uniform_mat4, shader_set_uniform_texture } from "../shader/shader_uniforms";
import type { ShaderSystem } from "../shader/ShaderSystem";
import type { Material } from "./material";

export function advanced_material_system(material: Material): ShaderSystem {
    const shader = generic_manager_get(ENGINE.MANAGER.SHADER, material.shaderName);
    if (!shader) throw new Error(`Shader ${material.shaderName} not found in SHADER_MANAGER.`);

    let flip_cache: Vec3 = { x: 0, y: 0, z: 0 };

    return {
        global() {

            const camera = Camera.getActivedCamera();
            if (!camera) return;

            const transform = Transform.getTransform(camera.gameEntity);
            if (transform == null) return;

            const viewMatrix = EasyGetter.getMat4(transform.instanceID)!;
            mat4_create_TR(viewMatrix, transform.position, transform.rotation);
            shader_set_uniform_mat4(shader, "uView", viewMatrix.value);

            const projectionMatrix = EasyGetter.getMat4(camera.instanceID)!;
            Mat4.creatrProjection(projectionMatrix, camera.fov, window.innerWidth / window.innerHeight, camera.near, camera.far)
            shader_set_uniform_mat4(shader, "uProjection", projectionMatrix.value);
        },

        local(gameEntity) {

            const transform = Transform.getTransform(gameEntity);
            if (!transform) return;

            const spriteRender = get_sprite_render(gameEntity);
            if (!spriteRender) return;

            if (!spriteRender.sprite) return;

            const modelMatrix = EasyGetter.getMat4(transform.instanceID)!;

            flip_cache.x = spriteRender.flipHorizontal ? -transform.scale.x : transform.scale.x;
            flip_cache.y = spriteRender.flipVertical ? -transform.scale.y : transform.scale.y;
            flip_cache.z = transform.scale.z;

            mat4_create_TRS(
                modelMatrix,
                transform.position,
                transform.rotation,
                flip_cache,

            );

            shader_set_uniform_mat4(shader, "uModel", modelMatrix.value);
            shader_set_uniform_4f(shader, "uColor", spriteRender.color.r, spriteRender.color.g, spriteRender.color.b, spriteRender.color.a)

            const texture = generic_manager_get(ENGINE.MANAGER.TEXTURE, spriteRender.sprite.textureName)!;
            shader_set_uniform_texture(shader, "uTexture", texture, 0);

            const uvScaleX = spriteRender.sprite.size.x / texture.width;
            const uvScaleY = spriteRender.sprite.size.y / texture.height;
            shader_set_uniform_2f(shader, "uUVScale", uvScaleX, uvScaleY);

            const uvOffsetX = spriteRender.sprite.position.x / texture.width;
            const uvOffsetY = (texture.height - spriteRender.sprite.position.y - spriteRender.sprite.size.y) / texture.height;
            shader_set_uniform_2f(shader, "uUVOffset", uvOffsetX, uvOffsetY);
        },

    };
}
