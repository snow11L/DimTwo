import { type MeshType } from "../core";
import { Global } from "../core/managers/engine.manager";
import { Mat4 } from "../core/math/mat4/Mat4";
import { SceneManager } from "../core/scene/SceneManager";
import type { GLVAO } from "../core/webgl/mesh_gl";

function getMat4(id: number): Mat4| null {
    const scene =SceneManager.getCurrentScene();
    if (!scene.mat4.values.has(id)) {
        scene.mat4.values.set(id, Mat4.create());
    }
    return scene.mat4.values.get(id) ?? null;
}

function getMesh(key: number): MeshType | null {
    return Global.ResourcesManager.MeshManager.generic_manager_get(key)
}

function getVAO(id: number): GLVAO | null {
    const scene =SceneManager.getCurrentScene();
    return scene.vao.values.get(id) ?? null;
}

export const EasyGetter = {
    getMat4,
    getMesh,
    getVAO
}