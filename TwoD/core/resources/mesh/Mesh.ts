import type { Mathf } from "../..";
import { Instantiable } from "../../base/Instantiable";
import type { Vec2 } from "../../math/vec2/Vec2";

export class Mesh extends Instantiable {
    name: string;
    vertices: Mathf.Vec3Type[];
    indices: number[];
    normals: Mathf.Vec3Type[];
    uvs: Vec2[];

    constructor(
        name: string,
        vertices: Mathf.Vec3Type[] = [],
        indices: number[] = [],
        normals: Mathf.Vec3Type[] = [],
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
