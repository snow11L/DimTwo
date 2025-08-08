
import { distanceSq, getClosestPoint, type Bounds } from "../../../math/geometry/Bounds";
import { Vec2 } from "../../../math/vec2/Vec2";


const VEC2_CACHE: Vec2 = new Vec2();

function testBoxBoxOverlap(a: Bounds, b: Bounds): boolean {
  if (a.right <= b.left) return false;
  if (a.left >= b.right) return false;
  if (a.bottom <= b.top) return false;
  if (a.top >= b.bottom) return false;

  return true;
}

function testBoxCircleOverlap(
  boxBounds: Bounds,
  circlePos: Vec2,
  circleRadius: number
): boolean {

  getClosestPoint(boxBounds, circlePos, VEC2_CACHE);
  const distSq = distanceSq(circlePos, VEC2_CACHE);
  return distSq <= (circleRadius * circleRadius);
}
export {
  testBoxBoxOverlap,
  testBoxCircleOverlap
};

