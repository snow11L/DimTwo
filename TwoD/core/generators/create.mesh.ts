import { Id } from "../base/Id";
import { Global } from "../managers/engine.manager";
import { generic_manager_add } from "../managers/generic_manager";
import type { Vec2 } from "../math/vec2/Vec2";
import type { Vec3 } from "../math/vec3/ Vec3";
import type { Mesh } from "../resources/mesh/Mesh";

export function createMesh(name: string, vertices: Vec3[], indices: number[], normals: Vec3[], uvs: Vec2[]) {

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