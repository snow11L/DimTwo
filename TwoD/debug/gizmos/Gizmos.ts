

import { Mathf, Transform } from "../..";
import { Meshs } from "../../assets/meshs/Meshs";
import { get_category } from "../../generators/get_component";
import { EasyGetter } from "../../managers/EasyGetters";
import { Global } from "../../managers/engine.manager";
import { generic_manager_get } from "../../managers/generic_manager";
import type { Color } from "../../math/color/types";

import type { Quat } from "../../math/quat/quat";
import { shader_set_uniform_4f, shader_set_uniform_mat4 } from "../../resources/shader";
import { ComponentTypes } from "../../types/component-type";

interface GizmosTransform {
    type: "square" | "circle";
    position: Mathf.Vec3Type;
    rotation: Quat;
    scale: Mathf.Vec3Type;
    color: Color;
}

const gizmosTransform: GizmosTransform[] = [];

function draw_wire_square(position: Mathf.Vec3Type, rotation: Quat, scale: Mathf.Vec3Type, color: Color) {
    if (!Gizmos.gizmosActive) return;
    gizmosTransform.push({
        type: "square",
        position,
        rotation,
        scale,
        color
    });
}

function draw_wire_circle(position: Mathf.Vec3Type, rotation: Quat, scale: Mathf.Vec3Type, color: Color) {
    if (!Gizmos.gizmosActive) return;
    gizmosTransform.push({
        type: "circle",
        position,
        rotation,
        scale,
        color
    });
}


const CACHE_MATRIX = Mathf.Mat4.createIdentity();

function drawGizmos() {
    const gl = Global.WebGL;
    const cameras = get_category(ComponentTypes.Camera);
    if (cameras.length === 0) return;
    const camera = cameras[0];

    const projectionMatrix = EasyGetter.getMat4(camera.instanceID);
    if (projectionMatrix == null) return;
    const transform = Transform.getTransform(camera.gameEntity);
    if (transform == null) return;
    const viewMatrix = EasyGetter.getMat4(transform.instanceID);
    if (viewMatrix == null) return;

    const vaoSquare = EasyGetter.getVAO(Meshs.wireSquare.instanceID);
    const vaoCircle = EasyGetter.getVAO(Meshs.wireCircle.instanceID);
    if (!vaoSquare || !vaoCircle) return;

    const shader = generic_manager_get(Global.ResourcesManager.ShaderManager, "gizmos");
    if (!shader) return;

    gl.useProgram(shader.program);
    shader_set_uniform_mat4(shader, "uView", viewMatrix.value);
    shader_set_uniform_mat4(shader, "uProjection", projectionMatrix.value);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    for (let i = 0; i < gizmosTransform.length; i++) {
        const gizmo = gizmosTransform[i];
        const vao = gizmo.type === "square" ? vaoSquare : vaoCircle;

        gl.bindVertexArray(vao.vao);

        Mathf.Mat4.createTRS(CACHE_MATRIX, gizmo.position, gizmo.rotation, gizmo.scale);
        shader_set_uniform_mat4(shader, "uModel", CACHE_MATRIX.value);
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
    draw_wire_circle,
    gizmosActive: false,
    drawGizmos
};
