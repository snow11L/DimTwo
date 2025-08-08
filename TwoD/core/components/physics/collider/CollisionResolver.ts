
import { BoxCollider2DLib, CircleCollider2DLib, TransformLib, type BoxCollider2DType, type CircleCollider2DType, type ColliderType } from "../../..";
import { getBounds, type Bounds } from "../../../math/geometry/Bounds";
import { Vec2 } from "../../../math/vec2/Vec2";
import { Vec3 } from "../../../math/vec3/ Vec3";
import { ComponentTypes } from "../../component-type";


import { isOfType } from "./isOfType";

export interface CollisionResolution {
  dx: number;
  dy: number;
}

const tempSizeA = new Vec3(0, 0, 0);
const tempSizeB = new Vec3(0, 0, 0);

const tempAddA = new Vec2(0, 0);
const tempAddB = new Vec2(0, 0);

function getEffectiveRadius(radius: number, scale: Vec3): number {
  return radius * Math.max(scale.x, scale.y);
}

export function resolveOverlap(aPos: Vec2, a: ColliderType, bPos: Vec2, b: ColliderType): Vec2 | null {
  const aTransform = TransformLib.getTransform(a.gameEntity);
  const bTransform = TransformLib.getTransform(b.gameEntity);
  if (!aTransform || !bTransform) return null;

  Vec2.add(aPos, a.center, tempAddA);
  Vec2.add(bPos, b.center, tempAddB);

  const isABox = isOfType<BoxCollider2DType>(a, ComponentTypes.BoxCollider2D);
  const isBBox = isOfType<BoxCollider2DType>(b, ComponentTypes.BoxCollider2D);
  const isACircle = isOfType<CircleCollider2DType>(a, ComponentTypes.CircleCollider2D);
  const isBCircle = isOfType<CircleCollider2DType>(b, ComponentTypes.CircleCollider2D);

  if (isABox && isBBox) {
    Vec3.mult(tempSizeA, aTransform.scale, a.size);
    Vec3.mult(tempSizeB, bTransform.scale, b.size);

    const aBounds: Bounds = getBounds(tempAddA, tempSizeA);
    const bBounds: Bounds = getBounds(tempAddB, tempSizeB);

    return BoxCollider2DLib.resolveBoxBoxOverlap(aBounds, bBounds);
  }

  if (isACircle && isBBox) {
    const effectiveRadius = getEffectiveRadius(a.radius, aTransform.scale);

    Vec3.mult(tempSizeB, bTransform.scale, b.size);
    const bBounds: Bounds = getBounds(tempAddB, tempSizeB);

    return CircleCollider2DLib.resolveCircleBoxOverlap(tempAddA, effectiveRadius, bBounds);
  }

  // Opcional: já deixar espaço preparado para Circle vs Circle ou Box vs Circle
  if (isACircle && isBCircle) {
    const aRadius = getEffectiveRadius(a.radius, aTransform.scale);
    const bRadius = getEffectiveRadius(b.radius, bTransform.scale);

    return CircleCollider2DLib.resolveCircleCircleOverlap(tempAddA, aRadius, tempAddB, bRadius);
  }

  if (isABox && isBCircle) {
    const effectiveRadius = getEffectiveRadius(b.radius, bTransform.scale);

    Vec3.mult(tempSizeA, aTransform.scale, a.size);
    const aBounds: Bounds = getBounds(tempAddA, tempSizeA);

    return BoxCollider2DLib.resolveBoxCircleOverlap(aBounds, tempAddB, effectiveRadius);
  }

  return null;
}
