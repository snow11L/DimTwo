import { Id } from "../../core/base/Id";
import type { Vec2 } from "../../core/math/vec2/Vec2";
import type { Vec3 } from "../../core/math/vec3/ Vec3";
import { ResourcesManager } from "../../global/manager/manager";
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

    ResourcesManager.MeshManager.add( mesh.instanceID.getValue(), mesh);
    return mesh;
}