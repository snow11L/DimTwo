import type { Mathf } from "../..";

export function vec3_lerp(out: Mathf.Vec3Type, a: Mathf.Vec3Type, b: Mathf.Vec3Type, t: number): Mathf.Vec3Type {
    out.x = a.x + (b.x - a.x) * t;
    out.y = a.y + (b.y - a.y) * t;
    out.z = a.z + (b.z - a.z) * t;
    return out;
}

export function add(out: Mathf.Vec3Type, a: Mathf.Vec3Type, b: Mathf.Vec3Type): Mathf.Vec3Type {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    out.z = a.z + b.z;
    return out;
}


export function mult(out: Mathf.Vec3Type, a: Mathf.Vec3Type, b: Mathf.Vec3Type): Mathf.Vec3Type {
    out.x = a.x * b.x;
    out.y = a.y * b.y;
    out.z = a.z * b.z;
    return out;
}

export function scale(out: Mathf.Vec3Type, a: Mathf.Vec3Type, scalar: number): Mathf.Vec3Type {
    out.x = a.x * scalar;
    out.y = a.y * scalar;
    out.z = a.z * scalar;
    return out;
}


export function subVec3(a: Mathf.Vec3Type, b: Mathf.Vec3Type): Mathf.Vec3Type {
    return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function scaleVec3(a: Mathf.Vec3Type, scalar: number): Mathf.Vec3Type {
    return { x: a.x * scalar, y: a.y * scalar, z: a.z * scalar };
}

export function crossVec3(a: Mathf.Vec3Type, b: Mathf.Vec3Type): Mathf.Vec3Type {
    return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x
    };
}

export function dotVec3(a: Mathf.Vec3Type, b: Mathf.Vec3Type): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function normalizeVec3(v: Mathf.Vec3Type): Mathf.Vec3Type {
    const length = Math.hypot(v.x, v.y, v.z);
    return length > 0 ? { x: v.x / length, y: v.y / length, z: v.z / length } : { x: 0, y: 0, z: 0 };
}

export function vec3Tof32Arr(vectors: Mathf.Vec3Type[], out?: Float32Array): Float32Array {
    if (!out || out.length < vectors.length * 3) {
        out = new Float32Array(vectors.length * 3);
    }
    for (let i = 0; i < vectors.length; i++) {
        const v = vectors[i];
        out[i * 3] = v.x;
        out[i * 3 + 1] = v.y;
        out[i * 3 + 2] = v.z;
    }
    return out;
}

export function create(x = 0, y = 0, z = 0): Mathf.Vec3Type {
    return { x, y, z }
}