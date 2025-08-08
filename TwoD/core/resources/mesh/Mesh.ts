import { Instantiable } from "../../base/Instantiable";
import type { Vec2 } from "../../math/vec2/Vec2";
import type { Vec3 } from "../../math/vec3/ Vec3";

export class Mesh extends Instantiable {
    name: string;
    vertices: Vec3[];
    indices: number[];
    normals: Vec3[];
    uvs: Vec2[];

    constructor(
        name: string,
        vertices: Vec3[] = [],
        indices: number[] = [],
        normals: Vec3[] = [],
        uvs: Vec2[] = []
    ) {
        super();
        this.name = name;
        this.vertices = vertices;
        this.indices = indices;
        this.normals = normals;
        this.uvs = uvs;
    }
}
