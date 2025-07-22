import { Global } from "../managers/engine.manager";
import { generic_manager_add } from "../managers/generic_manager";
import type { Vec2 } from "../math/vec2/Vec2";
import type { Vec3 } from "../math/vec3/vec3";
import type { MeshType } from "../resources/mesh/types";
import { createIncrementalId } from "./create.incremental.id";

export function createMesh(name: string, vertices: Vec3[], indices: number[], normals: Vec3[], uvs: Vec2[]) {

    const mesh: MeshType = {
        name: name,
        vertices: vertices,
        indices: indices,
        normals: normals,
        uvs: uvs,
        instanceID: createIncrementalId()
    }

    generic_manager_add(Global.ResourcesManager.MeshManager, mesh.instanceID, mesh);
    return mesh;
}