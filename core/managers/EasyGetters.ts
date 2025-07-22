import { ENGINE } from "../../api/engine.manager";
import { Mat4 } from "../math/mat4/mat4";
import type { Mesh } from "../resources/mesh/mesh";
import { Scene } from "../resources/scene/scene";
import type { GLVAO } from "../webgl/mesh_gl";
import { generic_manager_get } from "./generic_manager";

function getMat4(id: number): Mat4 | null {
    const scene = Scene.getCurrentScene();
    if (!scene.mat4.values.has(id)) {
        scene.mat4.values.set(id, Mat4.createIdentity());
    }
    return scene.mat4.values.get(id) ?? null;
}

function getMesh(key: number): Mesh | null {
    return generic_manager_get(ENGINE.MANAGER.MESH, key)
}

function getVAO(id: number): GLVAO | null {
    const scene = Scene.getCurrentScene();
    return scene.vao.values.get(id) ?? null;
}

export const EasyGetter = {
    getMat4,
    getMesh,
    getVAO
}