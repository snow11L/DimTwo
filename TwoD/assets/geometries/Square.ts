import type { Mathf } from "../..";
import { createMesh } from "../../generators/create.mesh";
import type { Vec2 } from "../../math/vec2/Vec2";
import type { MeshType } from "../../resources/mesh/types";

export function createFillSquareMesh(name: string, size: Mathf.Vec3Type): MeshType {
    const halfSize = {
        x: size.x * 0.5,
        y: size.y * 0.5,
        z: size.z * 0.5,
    };

    const vertices: Mathf.Vec3Type[] = [
        { x: -halfSize.x, y: -halfSize.y, z: 0 },
        { x: halfSize.x, y: -halfSize.y, z: 0 },
        { x: halfSize.x, y: halfSize.y, z: 0 },
        { x: -halfSize.x, y: halfSize.y, z: 0 },
    ]

    const indices: number[] = [
        0, 1, 2,
        2, 3, 0,
    ]

    const normals: Mathf.Vec3Type[] = [
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

export function createWireSquareMesh(name: string, size: Mathf.Vec3Type): MeshType {
    const halfSize = {
        x: size.x * 0.5,
        y: size.y * 0.5,
        z: size.z * 0.5,
    };

    const vertices: Mathf.Vec3Type[] = [
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

    const normals:Mathf.Vec3Type[] = [];
    const uvs: Vec2[] = []; 

    return createMesh(name, vertices, indices, normals, uvs);
}

export function createWireCircleMesh(name: string, radius: number, divisions: number): MeshType {
    const vertices:Mathf.Vec3Type[] = [];
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

    const normals: Mathf.Vec3Type[] = [];
    const uvs: Vec2[] = [];

    return createMesh(name, vertices, indices, normals, uvs);
}
