import type { Mesh } from "../../webgl/mesh";
import type { Vec3 } from "../../webgl/vec3";

export function createQuadMesh(name: string, size: Vec3): Mesh {
    const halfSize = {
        x: size.x * 0.5,
        y: size.y * 0.5,
        z: size.z * 0.5,
    };

    return {
        name: name,
        vertices: [
            { x: -halfSize.x, y: -halfSize.y, z: 0 },
            { x: halfSize.x, y: -halfSize.y, z: 0 },
            { x: halfSize.x, y: halfSize.y, z: 0 },
            { x: -halfSize.x, y: halfSize.y, z: 0 },
        ],
        indices: [
            0, 1, 2,
            2, 3, 0,
        ],
        normals: [
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
        ],
        uvs: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 1 },
        ],
    };
}

export function createQuadLineMesh(name: string, size: Vec3): Mesh {
    const halfSize = {
        x: size.x * 0.5,
        y: size.y * 0.5,
        z: size.z * 0.5,
    };

    return {
        name: name,
        vertices: [
            { x: -halfSize.x, y: -halfSize.y, z: 0 },
            { x: halfSize.x, y: -halfSize.y, z: 0 },
            { x: halfSize.x, y: halfSize.y, z: 0 },
            { x: -halfSize.x, y: halfSize.y, z: 0 },
        ],
        indices: [
            0, 1,   // bottom edge
            1, 2,   // right edge
            2, 3,   // top edge
            3, 0    // left edge
        ],
        normals: [
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
        ],
        uvs: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 1 },
        ],
    };
}