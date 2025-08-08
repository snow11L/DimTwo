import { createMesh } from "../../core/generators/create.mesh";
import type { Vec2 } from "../../core/math/vec2/Vec2";
import type { Vec3 } from "../../core/math/vec3/ Vec3";
import type { Mesh } from "../../core/resources/mesh/Mesh";

export function createFillSquareMesh(name: string, size: Vec3): Mesh {
    const halfSize = {
        x: size.x * 0.5,
        y: size.y * 0.5,
        z: size.z * 0.5,
    };

    const vertices: Vec3[] = [
        { x: -halfSize.x, y: -halfSize.y, z: 0 },
        { x: halfSize.x, y: -halfSize.y, z: 0 },
        { x: halfSize.x, y: halfSize.y, z: 0 },
        { x: -halfSize.x, y: halfSize.y, z: 0 },
    ]

    const indices: number[] = [
        0, 1, 2,
        2, 3, 0,
    ]

    const normals: Vec3[] = [
        { x: 0, y: 0, z: 1 },
        { x: 0, y: 0, z: 1 },
        { x: 0, y: 0, z: 1 },
        { x: 0, y: 0, z: 1 },
    ]

    const uvs: Vec2[] = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
    ]

    return createMesh(name, vertices, indices, normals, uvs);
}

export function createWireSquareMesh(name: string, size: Vec3): Mesh {
    const halfSize = {
        x: size.x * 0.5,
        y: size.y * 0.5,
        z: size.z * 0.5,
    };

    const vertices: Vec3[] = [
        { x: -halfSize.x, y: -halfSize.y, z: 0 },
        { x: halfSize.x, y: -halfSize.y, z: 0 },
        { x: halfSize.x, y: halfSize.y, z: 0 },
        { x: -halfSize.x, y: halfSize.y, z: 0 },
    ];

    const indices: number[] = [
        0, 1,
        1, 2,
        2, 3,
        3, 0,
    ];

    const normals:Vec3[] = [];
    const uvs: Vec2[] = []; 

    return createMesh(name, vertices, indices, normals, uvs);
}

export function createWireCircleMesh(name: string, radius: number, divisions: number): Mesh {
    const vertices:Vec3[] = [];
    const indices: number[] = [];

    const angleStep = (Math.PI * 2) / divisions;

    for (let i = 0; i < divisions; i++) {
        const angle = i * angleStep;
        vertices.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            z: 0,
        });
    }

    for (let i = 0; i < divisions; i++) {
        indices.push(i, (i + 1) % divisions);
    }

    const normals: Vec3[] = [];
    const uvs: Vec2[] = [];

    return createMesh(name, vertices, indices, normals, uvs);
}
