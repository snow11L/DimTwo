import { BoxCollider2D, CircleCollider2D, type Types } from "../../components";
import { get_transform } from "../../generators/get_component";
import { getBounds, type Bounds } from "../../math/geometry/Bounds";
import type { Vec2 } from "../../math/vec2/Vec2";
import Vec2Math from "../../math/vec2/vec2-math";
import { Vec3 } from "../../math/vec3/vec3";
import { ComponentType } from "../../types/component-type";
import { isOfType } from "./isOfType";

const tempA = Vec3.create();
const tempB = Vec3.create();

function getEffectiveRadius(radius: number, scale: Vec3): number {
  return radius * Math.max(scale.x, scale.y);
}

export function testOverlap(aPos: Vec2, a: Types.Collider, bPos: Vec2, b: Types.Collider): boolean {
  const aTransform = get_transform(a.gameEntity);
  const bTransform = get_transform(b.gameEntity);
  if (!aTransform || !bTransform) return false;

  const offsetA = Vec2Math.add(aPos, a.center);
  const offsetB = Vec2Math.add(bPos, b.center);

  const isABox = isOfType<Types.BoxCollider2D>(a, ComponentType.BoxCollider2D);
  const isBBox = isOfType<Types.BoxCollider2D>(b, ComponentType.BoxCollider2D);
  const isACircle = isOfType<Types.CircleCollider2D>(a, ComponentType.CircleCollider2D);
  const isBCircle = isOfType<Types.CircleCollider2D>(b, ComponentType.CircleCollider2D);

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

    return BoxCollider2D.testBoxCircleOverlap(aBounds, offsetB, effectiveRadius);
  }

  if (isACircle && isBCircle) {
    const aRadius = getEffectiveRadius(a.radius, aTransform.scale);
    const bRadius = getEffectiveRadius(b.radius, bTransform.scale);

    return CircleCollider2D.testCircleCircleOverlap(offsetA, aRadius, offsetB, bRadius);
  }

  if (isACircle && isBBox) {
    const effectiveRadius = getEffectiveRadius(a.radius, aTransform.scale);

    Vec3.mult(tempB, bTransform.scale, b.size);
    const bBounds: Bounds = getBounds(offsetB, tempB);

    return CircleCollider2D.testCircleBoxOverlap(offsetA, effectiveRadius, bBounds);
  }

  return false;
}
