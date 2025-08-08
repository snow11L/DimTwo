import { distanceSq, getClosestPoint, type Bounds } from "../../../math/geometry/Bounds";
import { Vec2 } from "../../../math/vec2/Vec2";

const VEC2_CACHE: Vec2 = new Vec2();

function testCircleCircleOverlap(aPos: Vec2, aRadius: number, bPos: Vec2, bRadius: number): boolean {
  if (aRadius <= 0 || bRadius <= 0) return false;

  const distSq = distanceSq(bPos, aPos);
  const radiusSum = aRadius + bRadius;

  return distSq <= radiusSum * radiusSum;
}

function testCircleBoxOverlap(
  circlePos: Vec2,
  circleRadius: number,
  boxBounds: Bounds
): boolean {

  getClosestPoint(boxBounds, circlePos, VEC2_CACHE);
  const distSq = distanceSq(circlePos, VEC2_CACHE);
  return distSq <= (circleRadius * circleRadius);
}

export {
  testCircleBoxOverlap, testCircleCircleOverlap
};

