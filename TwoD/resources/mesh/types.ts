import type { Vec2 } from "../../math/vec2/Vec2";
import type { Vec3 } from "../../math/vec3/vec3";

export interface Instantiable {
    instanceID: number;
}

export interface MeshType extends Instantiable {
    name: string;
    vertices: Vec3[];
    indices: number[];
    normals: Vec3[];
    uvs: Vec2[];
}