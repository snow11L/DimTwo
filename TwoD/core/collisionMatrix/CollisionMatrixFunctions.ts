import type { CollisionMask } from "../collisionMask/types";
import type { CollisionMatrixType } from "./types";

export function createCollisionMatrix(size: number): CollisionMatrixType {
  return {
    size,
    matrix: Array.from({ length: size }, () => Array(size).fill(true)),
  };
}

export function setCollision(
  cm: CollisionMatrixType,
  layerA: number,
  layerB: number,
  canCollide: boolean
): void {
  if (
    layerA >= 0 &&
    layerA < cm.size &&
    layerB >= 0 &&
    layerB < cm.size
  ) {
    cm.matrix[layerA][layerB] = canCollide;
    cm.matrix[layerB][layerA] = canCollide; 
  } else {
    throw new Error('Layer inválida');
  }
}

export function canCollide(cm: CollisionMatrixType, layerA: CollisionMask, layerB: CollisionMask): boolean {
  if (
    layerA >= 0 &&
    layerA < cm.size &&
    layerB >= 0 &&
    layerB < cm.size
  ) {
    return cm.matrix[layerA][layerB];
  }
  throw new Error('Layer inválida');
}
