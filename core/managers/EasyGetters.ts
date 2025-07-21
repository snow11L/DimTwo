import { ENGINE } from "../../engine/engine.manager";
import type { Mat4 } from "../webgl/mat4";
import type { Mesh } from "../webgl/mesh";
import type { GLVAO } from "../webgl/mesh_gl";
import { generic_manager_get } from "./generic_manager";

function getMat4(key: number): Mat4 | null {
    return generic_manager_get(ENGINE.MANAGER.MAT4, key);
}

function getMesh(key: string): Mesh | null {
    return generic_manager_get(ENGINE.MANAGER.MESH, key)
}

function getVAO(key: string) : GLVAO | null {
    return generic_manager_get(ENGINE.MANAGER.VAO, key);
}

export const EasyGetter = {
    getMat4,
    getMesh,
    getVAO
}


// function getTransform(key: number): TransformComponent | null;