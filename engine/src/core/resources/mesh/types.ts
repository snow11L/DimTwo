import type { Mathf } from "../..";
import type { Vec2 } from "../../math/vec2/Vec2";

export interface Instantiable {
    instanceID: number;
}

export interface MeshType extends Instantiable {
    name: string;
    vertices: Mathf.Vec3Type[];
    indices: number[];
    normals: Mathf.Vec3Type[];
    uvs: Vec2[];
}