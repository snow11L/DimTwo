import type { Bounds } from "../../collider/types/Bounds";
import { getBoxOverlapInto, getBoundsCenterInto, getSeparationDirection } from "../../collider/util/getCircleCenter";
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

