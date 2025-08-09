import { Id } from "../core/base/Id";
import { Global } from "../core/managers/engine.manager";
import type { Vec2 } from "../core/math/vec2/Vec2";
import type { Vec3 } from "../core/math/vec3/ Vec3";
import type { Mesh } from "../core/resources/mesh/Mesh";

export function createMesh(name: string, vertices: Vec3[], indices: number[], normals: Vec3[], uvs: Vec2[]) {

    const mesh: Mesh = {
        name: name,
        vertices: vertices,
        indices: indices,
        normals: normals,
        uvs: uvs,
        instanceID: new Id()
    }

    Global.ResourcesManager.MeshManager.generic_manager_add( mesh.instanceID.getValue(), mesh);
    return mesh;
}