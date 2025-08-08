import { EPSILON, getClosestPoint, type Bounds } from "../../../math/geometry/Bounds";
import { Vec2 } from "../../../math/vec2/Vec2";

const _tmp = {
  delta: { x: 0, y: 0 },
};
const closestPointResult: Vec2 = { x: 0, y: 0 };
const delta: Vec2 = { x: 0, y: 0 };
const normal: Vec2 = { x: 0, y: 0 };


function resolveCircleCircleOverlap(
  aPos: Vec2,
  aRadius: number,
  bPos: Vec2,
  bRadius: number
): Vec2 | null {

  if (aRadius <= 0 || bRadius <= 0) return null;

  Vec2.subtract(bPos, aPos, _tmp.delta);
  const distSq = Vec2.lengthSquared(_tmp.delta);

  const radiiSum = aRadius + bRadius;
  if (distSq >= radiiSum * radiiSum) return null;

  const dist = Math.sqrt(distSq) || EPSILON;
  const overlap = radiiSum - dist;

  return {
    x: -(_tmp.delta.x / dist) * overlap,
    y: -(_tmp.delta.y / dist) * overlap
  };
}

//!!!!!!!!!!!! importate ----------------
// lempre disso no projeto, tive 2 hora de erro por conta disso

// para resolucao entre circle box o vetor e positivo
// para resolucao entre box circle e negatico
function resolveCircleBoxOverlap(

  circlePos: Vec2,
  circleRadius: number,
  boxBounds: Bounds
): Vec2 | null {
  getClosestPoint(boxBounds, circlePos, closestPointResult);

  Vec2.subtract(circlePos, closestPointResult, delta);

  const distSq = Vec2.lengthSquared(delta);

  if (distSq >= circleRadius * circleRadius) return null;

  let dist = Math.sqrt(distSq);
  if (dist === 0) dist = EPSILON;

  Vec2.normalize(delta, normal);

  const overlap = circleRadius - dist;

  return {
    x: normal.x * overlap,
    y: normal.y * overlap,
  };
}

export {
  resolveCircleBoxOverlap, resolveCircleCircleOverlap
};

