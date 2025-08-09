import { type MeshType } from "..";
import { Mat4 } from "../math/mat4/Mat4";
import { Scene } from "../resources/scene/scene";
import type { GLVAO } from "../webgl/mesh_gl";
import { Global } from "./engine.manager";

function getMat4(id: number): Mat4| null {
    const scene = Scene.getCurrentScene();
    if (!scene.mat4.values.has(id)) {
        scene.mat4.values.set(id, Mat4.create());
    }
    return scene.mat4.values.get(id) ?? null;
}

function getMesh(key: number): MeshType | null {
    return Global.ResourcesManager.MeshManager.generic_manager_get(key)
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