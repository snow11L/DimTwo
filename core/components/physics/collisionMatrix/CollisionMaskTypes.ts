export const CollisionMask = {
    DEFAULT: 0,
    TREE: 1,
    PLAYER: 2,
    ENEMY: 3,
   
} as const;

export type CollisionMask = typeof CollisionMask[keyof typeof CollisionMask];