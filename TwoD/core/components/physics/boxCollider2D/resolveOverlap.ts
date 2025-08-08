
import { getBoundsCenterInto, getBoxOverlapInto, getClosestPoint, getSeparationDirection, type Bounds } from "../../../math/geometry/Bounds";
import { Vec2 } from "../../../math/vec2/Vec2";

const _overlap = new Vec2();
const _centerA = new Vec2();
const _centerB = new Vec2();

const closestPointResult: Vec2 = { x: 0, y: 0 };
const delta: Vec2 = { x: 0, y: 0 };
const normal: Vec2 = { x: 0, y: 0 };

function resolveBoxBoxOverlap(
  a: Bounds,
  b: Bounds
): Vec2 | null {

  getBoxOverlapInto(a, b, _overlap);

  if (_overlap.x <= 0 || _overlap.y <= 0) return null;

  getBoundsCenterInto(a, _centerA);
  getBoundsCenterInto(b, _centerB);

  if (_overlap.x < _overlap.y) {
    return { x: getSeparationDirection(_centerA.x, _centerB.x, _overlap.x), y: 0 };
  } else {
    return { x: 0, y: getSeparationDirection(_centerA.y, _centerB.y, _overlap.y) };
  }
}

function resolveBoxCircleOverlap(
  boxBounds: Bounds,
  circlePos: Vec2,
  circleRadius: number
): Vec2 | null {
  getClosestPoint(boxBounds, circlePos, closestPointResult);

  Vec2.subtract(circlePos, closestPointResult, delta);
  
  const distSq = Vec2.length(delta);

  if (distSq >= circleRadius * circleRadius) return null;

  const dist = Math.sqrt(distSq) || 0.0001;

  Vec2.normalize(delta, normal);

  const overlap = circleRadius - dist;

  return {
    x: -normal.x * overlap,
    y: -normal.y * overlap,
  };
}

export {
  resolveBoxBoxOverlap,
  resolveBoxCircleOverlap
};

