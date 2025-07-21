import { ENGINE } from "../../../api/engine.manager";
import { createIncrementalId } from "../../generators/create.incremental.id";
import { generic_manager_add } from "../../managers/generic_manager";
import type { Vec2 } from "../../math/vec2/Vec2";
import type { Mesh } from "../../resources/mesh/mesh";
import { createMeshVAO } from "../../webgl/mesh_gl";
import type { Vec3 } from "../../math/vec3/vec3";

export function createMesh(name: string, vertices: Vec3[], indices: number[], normals: Vec3[], uvs: Vec2[]) {

    const mesh: Mesh = {
        name: name,
        vertices: vertices,
        indices: indices,
        normals: normals,
        uvs: uvs,
        instanceID: createIncrementalId()
    }

    generic_manager_add(ENGINE.MANAGER.MESH, mesh.instanceID, mesh);
    const meshVAO = createMeshVAO(ENGINE.WEB_GL, mesh);
    generic_manager_add(ENGINE.MANAGER.VAO, mesh.instanceID, meshVAO);

    return mesh;
}