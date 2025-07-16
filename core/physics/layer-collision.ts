type LayerCollisionMatrix = boolean[][];

const LayerCollisionType = {
    NONE: 0,
    ALL: 1,
    PLAYER: 2,
    ENEMY: 3,
    ITEM: 4,
    UI: 5,
    EFFECT: 6,
    BACKGROUND: 7,
    FOREGROUND: 8,
    CUSTOM: 9,
} as const;

export type LayerCollisionType = typeof LayerCollisionType[keyof typeof LayerCollisionType];

function createLayCollisionMatrix(max: number): LayerCollisionMatrix {
    const matrix: LayerCollisionMatrix = [];
    for (let i = 0; i < max; i++) {
        matrix[i] = [];
        for (let j = 0; j < max; j++) {
            matrix[i][j] = true;
        }
    }
    return matrix;

}

function setLayerCollision(matrix: LayerCollisionMatrix, layer1: LayerCollisionType, layer2: LayerCollisionType, canCollide: boolean): void {
    if (layer1 < matrix.length && layer2 < matrix.length) {
        matrix[layer1][layer2] = canCollide;
        matrix[layer2][layer1] = canCollide;
    }
}

export const LAYER_COLLISION_MATRIX: LayerCollisionMatrix = createLayCollisionMatrix(10);