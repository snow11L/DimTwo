import { BoxCollider2D, CircleCollider2D, type Types } from "../../components";
import { get_transform } from "../../generators/get_component";
import type { Vec2 } from "../../math/vec2/Vec2";
import Vec2Math from "../../math/vec2/vec2-math";
import { Vec3 } from "../../math/vec3/vec3";
import { ComponentType } from "../../types/component-type";
import type { Bounds } from "../types/Bounds";
import { getBounds } from "../util/getCircleCenter";
import { isOfType } from "../util/isOfType";

const tempA = Vec3.create();
const tempB = Vec3.create();

export function testOverlap(aPos: Vec2, a: Types.Collider, bPos: Vec2, b: Types.Collider): boolean {
  if (isOfType<Types.BoxCollider2D>(a, ComponentType.BoxCollider2D) &&
    isOfType<Types.BoxCollider2D>(b, ComponentType.BoxCollider2D)) {

    const offsetA = Vec2Math.add(aPos, a.center);
    const offsetB = Vec2Math.add(bPos, b.center);

    const aTransform = get_transform(a.gameEntity);
    const bTransform = get_transform(b.gameEntity);

    if (!aTransform || !bTransform) return false;

    Vec3.mult(tempA, aTransform.scale, a.size);
    Vec3.mult(tempB, bTransform.scale, b.size);

    const aBounds: Bounds = getBounds(offsetA, tempA);
    const bBounds: Bounds = getBounds(offsetB, tempB);
    return BoxCollider2D.testBoxBoxOverlap(aBounds, bBounds);
  }







  if (isOfType<Types.CircleCollider2D>(a, ComponentType.CircleCollider2D) &&
    isOfType<Types.BoxCollider2D>(b, ComponentType.BoxCollider2D)) {

    const offsetA = Vec2Math.add(aPos, a.center);
    const offsetB = Vec2Math.add(bPos, b.center);

    const aTransform = get_transform(a.gameEntity);
    const bTransform = get_transform(b.gameEntity);

    if (!aTransform || !bTransform) return false;
 const effectiveRadius = a.radius * aTransform.scale.x; 
    Vec3.scale(tempA, aTransform.scale, a.radius);
    Vec3.mult(tempB, bTransform.scale, b.size);

   
    const bBounds: Bounds = getBounds(offsetB, tempB);
    return CircleCollider2D.testCircleBoxOverlap(offsetA, effectiveRadius, bBounds);
  }



  return false;
}
