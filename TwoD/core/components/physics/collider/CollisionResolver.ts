
import { BoxCollider2D, CircleCollider2D, Mathf, Transform, type BoxCollider2DType, type CircleCollider2DType, type ColliderType } from "../../..";
import { getBounds, type Bounds } from "../../../math/geometry/Bounds";
import type { Vec2 } from "../../../math/vec2/Vec2";
import Vec2Math from "../../../math/vec2/vec2-math";
import { ComponentTypes } from "../../component-type";

import { isOfType } from "./isOfType";

export interface CollisionResolution {
  dx: number;
  dy: number;
}

const tempSizeA = Mathf.Vec3.create();
const tempSizeB = Mathf.Vec3.create();

function getEffectiveRadius(radius: number, scale: Mathf.Vec3Type): number {
  return radius * Math.max(scale.x, scale.y);
}

export function resolveOverlap(aPos: Vec2, a: ColliderType, bPos: Vec2, b: ColliderType): Vec2 | null {
  const aTransform = Transform.getTransform(a.gameEntity);
  const bTransform = Transform.getTransform(b.gameEntity);
  if (!aTransform || !bTransform) return null;

  const offsetA = Vec2Math.add(aPos, a.center);
  const offsetB = Vec2Math.add(bPos, b.center);

  const isABox = isOfType<BoxCollider2DType>(a, ComponentTypes.BoxCollider2D);
  const isBBox = isOfType<BoxCollider2DType>(b, ComponentTypes.BoxCollider2D);
  const isACircle = isOfType<CircleCollider2DType>(a, ComponentTypes.CircleCollider2D);
  const isBCircle = isOfType<CircleCollider2DType>(b, ComponentTypes.CircleCollider2D);

  if (isABox && isBBox) {
    Mathf.Vec3.mult(tempSizeA, aTransform.scale, a.size);
    Mathf.Vec3.mult(tempSizeB, bTransform.scale, b.size);

    const aBounds: Bounds = getBounds(offsetA, tempSizeA);
    const bBounds: Bounds = getBounds(offsetB, tempSizeB);

    return BoxCollider2D.resolveBoxBoxOverlap(aBounds, bBounds);
  }

  if (isACircle && isBBox) {
    const effectiveRadius = getEffectiveRadius(a.radius, aTransform.scale);

    Mathf.Vec3.mult(tempSizeB, bTransform.scale, b.size);
    const bBounds: Bounds = getBounds(offsetB, tempSizeB);

    return CircleCollider2D.resolveCircleBoxOverlap(offsetA, effectiveRadius, bBounds);
  }

  // Opcional: já deixar espaço preparado para Circle vs Circle ou Box vs Circle
  if (isACircle && isBCircle) {
    const aRadius = getEffectiveRadius(a.radius, aTransform.scale);
    const bRadius = getEffectiveRadius(b.radius, bTransform.scale);

    return CircleCollider2D.resolveCircleCircleOverlap(offsetA, aRadius, offsetB, bRadius);
  }

  if (isABox && isBCircle) {
    const effectiveRadius = getEffectiveRadius(b.radius, bTransform.scale);

    Mathf.Vec3.mult(tempSizeA, aTransform.scale, a.size);
    const aBounds: Bounds = getBounds(offsetA, tempSizeA);

    return BoxCollider2D.resolveBoxCircleOverlap(aBounds, offsetB, effectiveRadius);
  }

  return null;
}
