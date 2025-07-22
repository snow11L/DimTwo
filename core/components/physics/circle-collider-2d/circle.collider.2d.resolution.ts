import { EPSILON, getClosestPoint, type Bounds } from "../../../math/geometry/Bounds";
import type { Vec2 } from "../../../math/vec2/Vec2";
import Vec2Math from "../../../math/vec2/vec2-math";


const _tmp = {
  delta: { x: 0, y: 0 },
};

export function resolveCircleCircleOverlap(
  aPos: Vec2,
  aRadius: number,
  bPos: Vec2,
  bRadius: number
): Vec2 | null {

  if (aRadius <= 0 || bRadius <= 0) return null;

  Vec2Math.subtractInto(bPos, aPos, _tmp.delta);
  const distSq = Vec2Math.lengthSquared(_tmp.delta);

  const radiiSum = aRadius + bRadius;
  if (distSq >= radiiSum * radiiSum) return null;

  const dist = Math.sqrt(distSq) || EPSILON;
  const overlap = radiiSum - dist;

  return {
    x: -(_tmp.delta.x / dist) * overlap,
    y: -(_tmp.delta.y / dist) * overlap
  };
}

const closestPointResult: Vec2 = { x: 0, y: 0 };
const delta: Vec2 = { x: 0, y: 0 };
const normal: Vec2 = { x: 0, y: 0 };



//!!!!!!!!!!!! importate ----------------
// lempre disso no projeto, tive 2 hora de erro por conta disso

// para resolucao entre circle box o vetor e positivo
// para resolucao entre box circle e negatico
export function resolveCircleBoxOverlap(

  circlePos: Vec2,
  circleRadius: number,
  boxBounds: Bounds
): Vec2 | null {
  getClosestPoint(boxBounds, circlePos, closestPointResult);

  Vec2Math.subtractInto(circlePos, closestPointResult, delta);

  const distSq = Vec2Math.lengthSquared(delta);

  if (distSq >= circleRadius * circleRadius) return null;

  let dist = Math.sqrt(distSq);
  if (dist === 0) dist = EPSILON;

  Vec2Math.normalizeInto(delta, normal);

  const overlap = circleRadius - dist;

  return {
    x: normal.x * overlap,
    y: normal.y * overlap,
  };
}
