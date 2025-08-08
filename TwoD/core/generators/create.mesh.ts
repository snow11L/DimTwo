import type { Mathf } from "..";
import { Id } from "../base/Id";
import { Global } from "../managers/engine.manager";
import { generic_manager_add } from "../managers/generic_manager";
import type { Vec2 } from "../math/vec2/Vec2";
import type { Mesh } from "../resources/mesh/Mesh";

export function createMesh(name: string, vertices: Mathf.Vec3Type[], indices: number[], normals: Mathf.Vec3Type[], uvs: Vec2[]) {

    const mesh: Mesh = {
        name: name,
        vertices: vertices,
        indices: indices,
        normals: normals,
        uvs: uvs,
        instanceID: new Id()
    }

    generic_manager_add(Global.ResourcesManager.MeshManager, mesh.instanceID.getValue(), mesh);
    return mesh;
}