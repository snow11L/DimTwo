
import { getBoundsCenterInto, getBoxOverlapInto, getClosestPoint, getSeparationDirection, type Bounds } from "../../math/geometry/Bounds";
import type { Vec2 } from "../../math/vec2/Vec2";
import Vec2Math from "../../math/vec2/vec2-math";

const _overlap = Vec2Math.create();
const _centerA = Vec2Math.create();
const _centerB = Vec2Math.create();

export function resolveBoxBoxOverlap(
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

const closestPointResult: Vec2 = { x: 0, y: 0 };
const delta: Vec2 = { x: 0, y: 0 };
const normal: Vec2 = { x: 0, y: 0 };

export function resolveBoxCircleOverlap(
  boxBounds: Bounds,
  circlePos: Vec2,
  circleRadius: number
): Vec2 | null {
  getClosestPoint(boxBounds, circlePos, closestPointResult);

  Vec2Math.subtractInto(circlePos, closestPointResult, delta);
  
  const distSq = Vec2Math.lengthSquared(delta);

  if (distSq >= circleRadius * circleRadius) return null;

  const dist = Math.sqrt(distSq) || 0.0001;

  Vec2Math.normalizeInto(delta, normal);

  const overlap = circleRadius - dist;

  return {
    x: -normal.x * overlap,
    y: -normal.y * overlap,
  };
}
