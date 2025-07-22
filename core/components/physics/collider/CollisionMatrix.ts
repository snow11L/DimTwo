export const CollisionMask = {
    DEFAULT: 0,
    TREE: 1,
    PLAYER: 2,
    ENEMY: 3,
   
} as const;

export type CollisionMask = typeof CollisionMask[keyof typeof CollisionMask];

const MAX_LAYERS = 32;

const COLLISION_MATRIX: boolean[][] = Array.from({ length: MAX_LAYERS }, () =>
    Array.from({ length: MAX_LAYERS }, () => true)
);

export function setCollision(a: CollisionMask, b: CollisionMask, shouldCollide: boolean) {
    COLLISION_MATRIX[a][b] = shouldCollide;
    COLLISION_MATRIX[b][a] = shouldCollide;
}

export function shouldLayersCollide(a: CollisionMask, b: CollisionMask): boolean {
    return COLLISION_MATRIX[a][b];
}

export const Collision = {
    setCollision,
    shouldLayersCollide
}