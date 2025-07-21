import { ENGINE } from "../../api/engine.manager";
import type { Mat4 } from "../math/mat4/mat4";
import type { Mesh } from "../resources/mesh/mesh";
import type { GLVAO } from "../webgl/mesh_gl";
import { generic_manager_get } from "./generic_manager";

function getMat4(key: number): Mat4 | null {
    return generic_manager_get(ENGINE.MANAGER.MAT4, key);
}

function getMesh(key: number): Mesh | null {
    return generic_manager_get(ENGINE.MANAGER.MESH, key)
}

function getVAO(key: number) : GLVAO | null {
    return generic_manager_get(ENGINE.MANAGER.VAO, key);
}

export const EasyGetter = {
    getMat4,
    getMesh,
    getVAO
}