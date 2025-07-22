import type { Bounds } from "../../collider/types/Bounds";
import { distanceSq, getClosestPoint } from "../../collider/util/getCircleCenter";
import type { Vec2 } from "../../math/vec2/Vec2";
import Vec2Math from "../../math/vec2/vec2-math";

export function testCircleCircleOverlap(aPos: Vec2, aRadius: number, bPos: Vec2, bRadius: number): boolean {
  if (aRadius <= 0 || bRadius <= 0) return false;

  const distSq = distanceSq(bPos, aPos);
  const radiusSum = aRadius + bRadius;

  return distSq <= radiusSum * radiusSum;
}

const VEC2_CACHE: Vec2 = Vec2Math.create();
export function testCircleBoxOverlap(
  circlePos: Vec2,
  circleRadius: number,
  boxBounds: Bounds
): boolean {

  getClosestPoint(boxBounds, circlePos, VEC2_CACHE);
  const distSq = distanceSq(circlePos, VEC2_CACHE);
  return distSq <= (circleRadius * circleRadius);
}