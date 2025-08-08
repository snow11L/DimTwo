import {
  BoxCollider2DLib,
  CircleCollider2DLib,
  type BoxCollider2DType,
  type CircleCollider2DType,
  type ColliderType
} from "..";
import { TransformLib } from "../../..";
import { getBounds, type Bounds } from "../../../math/geometry/Bounds";
import { Vec2 } from "../../../math/vec2/Vec2";
import { Vec3 } from "../../../math/vec3/ Vec3";

import { ComponentTypes } from "../../component-type";

import { isOfType } from "./isOfType";

const tempA = new Vec3(0, 0, 0);
const tempB = new Vec3(0, 0, 0);

const tempAddA = new Vec2(0, 0);
const tempAddB = new Vec2(0, 0);

function getEffectiveRadius(radius: number, scale: Vec3): number {
  return radius * Math.max(scale.x, scale.y);
}

export function testOverlap(
  aPos: Vec2,
  a: ColliderType,
  bPos: Vec2,
  b: ColliderType,
): boolean {
  const aTransform = TransformLib.getTransform(a.gameEntity);
  const bTransform = TransformLib.getTransform(b.gameEntity);
  if (!aTransform || !bTransform) return false;

  Vec2.add(aPos, a.center, tempAddA);
  Vec2.add(bPos, b.center, tempAddB);

  const isABox = isOfType<BoxCollider2DType>(a, ComponentTypes.BoxCollider2D);
  const isBBox = isOfType<BoxCollider2DType>(b, ComponentTypes.BoxCollider2D);
  const isACircle = isOfType<CircleCollider2DType>(
    a,
    ComponentTypes.CircleCollider2D,
  );
  const isBCircle = isOfType<CircleCollider2DType>(
    b,
    ComponentTypes.CircleCollider2D,
  );

  if (isABox && isBBox) {
    Vec3.mult(tempA, aTransform.scale, a.size);
    Vec3.mult(tempB, bTransform.scale, b.size);

    const aBounds: Bounds = getBounds(tempAddA, tempA);
    const bBounds: Bounds = getBounds(tempAddA, tempB);

    return BoxCollider2DLib.testBoxBoxOverlap(aBounds, bBounds);
  }

  if (isABox && isBCircle) {
    const effectiveRadius = getEffectiveRadius(b.radius, bTransform.scale);

    Vec3.mult(tempA, aTransform.scale, a.size);
    const aBounds: Bounds = getBounds(tempAddA, tempA);

    return BoxCollider2DLib.testBoxCircleOverlap(
      aBounds,
      tempAddA,
      effectiveRadius,
    );
  }

  if (isACircle && isBCircle) {
    const aRadius = getEffectiveRadius(a.radius, aTransform.scale);
    const bRadius = getEffectiveRadius(b.radius, bTransform.scale);

    return CircleCollider2DLib.testCircleCircleOverlap(
      tempAddA,
      aRadius,
      tempAddA,
      bRadius,
    );
  }

  if (isACircle && isBBox) {
    const effectiveRadius = getEffectiveRadius(a.radius, aTransform.scale);

    Vec3.mult(tempB, bTransform.scale, b.size);
    const bBounds: Bounds = getBounds(tempAddA, tempB);

    return CircleCollider2DLib.testCircleBoxOverlap(
      tempAddA,
      effectiveRadius,
      bBounds,
    );
  }

  return false;
}
