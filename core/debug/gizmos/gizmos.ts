import { ENGINE } from "../../../engine/engine.manager";
import type { Color } from "../../../game/systems/procedural-world/color";
import { get_category, get_mat4, get_transform } from "../../components/get_component";
import { generic_manager_get } from "../../managers/generic_manager";
import { ComponentType } from "../../types/component-type";
import { mat4_create_TRS, mat4_identity } from "../../webgl/mat4";
import type { Quat } from "../../webgl/quat";
import { shader_set_uniform_4f, shader_set_uniform_mat4 } from "../../webgl/shader";
import type { Vec3 } from "../../webgl/vec3";

interface GizmosTransform {
    position: Vec3;
    rotation: Quat;
    scale: Vec3;
    color: Color;
}

const gizmosTransform: GizmosTransform[] = [];

function draw_wire_square(position: Vec3, rotation: Quat, scale: Vec3, color: Color) {
    if (!Gizmos.gizmosActive) return;
    gizmosTransform.push({
        position,
        rotation,
        scale,
        color
    });
}

const identity = mat4_identity();

function drawGizmos() {
    const gl = ENGINE.WEB_GL;
    const cameras = get_category(ComponentType.CAMERA);
    if (cameras.length === 0) return;
    const camera = cameras[0];

    const projectionMatrix = get_mat4(camera.instance);
    if (projectionMatrix == null) return;
    const transform = get_transform(camera.gameEntity);
    if (transform == null) return;
    const viewMatrix = get_mat4(transform.instance);
    if (viewMatrix == null) return;

    const vao = generic_manager_get(ENGINE.MANAGER.VAO, "wire_square_instanced");
    if (!vao) return;

    const shader = generic_manager_get(ENGINE.MANAGER.SHADER, "gizmos");
    if (!shader) return;


    gl.useProgram(shader.program);
    shader_set_uniform_mat4(shader, "uView", viewMatrix.value);
    shader_set_uniform_mat4(shader, "uProjection", projectionMatrix.value);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.bindVertexArray(vao.vao);

    for (let i = 0; i < gizmosTransform.length; i++) {
        const gizmo = gizmosTransform[i];

        mat4_create_TRS(identity, gizmo.position, gizmo.rotation, gizmo.scale);
        shader_set_uniform_mat4(shader, "uModel", identity.value);
        shader_set_uniform_4f(shader, "uColor", gizmo.color.r, gizmo.color.g, gizmo.color.b, gizmo.color.a);

        gl.drawElements(
            gl.LINES,
            vao.indexCount,
            gl.UNSIGNED_SHORT,
            0
        );
    }

    gl.bindVertexArray(null);
    gizmosTransform.length = 0;
}

export const Gizmos = {
    draw_wire_square,
    gizmosActive: false,
    drawGizmos
};
