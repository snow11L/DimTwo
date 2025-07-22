import {
  BoxCollider2D,
  type BoxCollider2DType,
  CircleCollider2D,
  type CircleCollider2DType,
  type ColliderType,
} from "..";
import { type Bounds, getBounds } from "../../../math/geometry/Bounds";
import type { Vec2 } from "../../../math/vec2/Vec2";
import Vec2Math from "../../../math/vec2/vec2-math";
import { Vec3 } from "../../../math/vec3/vec3";
import { ComponentType } from "../../../types/component-type";
import { Transform } from "../../spatial";
import { isOfType } from "./isOfType";

const tempA = Vec3.create();
const tempB = Vec3.create();

function getEffectiveRadius(radius: number, scale: Vec3): number {
  return radius * Math.max(scale.x, scale.y);
}

export function testOverlap(
  aPos: Vec2,
  a: ColliderType,
  bPos: Vec2,
  b: ColliderType,
): boolean {
  const aTransform = Transform.getTransform(a.gameEntity);
  const bTransform = Transform.getTransform(b.gameEntity);
  if (!aTransform || !bTransform) return false;

  const offsetA = Vec2Math.add(aPos, a.center);
  const offsetB = Vec2Math.add(bPos, b.center);

  const isABox = isOfType<BoxCollider2DType>(a, ComponentType.BoxCollider2D);
  const isBBox = isOfType<BoxCollider2DType>(b, ComponentType.BoxCollider2D);
  const isACircle = isOfType<CircleCollider2DType>(
    a,
    ComponentType.CircleCollider2D,
  );
  const isBCircle = isOfType<CircleCollider2DType>(
    b,
    ComponentType.CircleCollider2D,
  );

  if (isABox && isBBox) {
    Vec3.mult(tempA, aTransform.scale, a.size);
    Vec3.mult(tempB, bTransform.scale, b.size);

    const aBounds: Bounds = getBounds(offsetA, tempA);
    const bBounds: Bounds = getBounds(offsetB, tempB);

    return BoxCollider2D.testBoxBoxOverlap(aBounds, bBounds);
  }

  if (isABox && isBCircle) {
    const effectiveRadius = getEffectiveRadius(b.radius, bTransform.scale);

    Vec3.mult(tempA, aTransform.scale, a.size);
    const aBounds: Bounds = getBounds(offsetA, tempA);

    return BoxCollider2D.testBoxCircleOverlap(
      aBounds,
      offsetB,
      effectiveRadius,
    );
  }

  if (isACircle && isBCircle) {
    const aRadius = getEffectiveRadius(a.radius, aTransform.scale);
    const bRadius = getEffectiveRadius(b.radius, bTransform.scale);

    return CircleCollider2D.testCircleCircleOverlap(
      offsetA,
      aRadius,
      offsetB,
      bRadius,
    );
  }

  if (isACircle && isBBox) {
    const effectiveRadius = getEffectiveRadius(a.radius, aTransform.scale);

    Vec3.mult(tempB, bTransform.scale, b.size);
    const bBounds: Bounds = getBounds(offsetB, tempB);

    return CircleCollider2D.testCircleBoxOverlap(
      offsetA,
      effectiveRadius,
      bBounds,
    );
  }

  return false;
}
