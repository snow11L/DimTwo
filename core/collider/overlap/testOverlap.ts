import { ComponentType } from "../../types/component-type";
import { testBoxBoxOverlap } from "./testBoxBoxOverlap";
import type { ColliderComponent } from "../types/Collider";
import { get_transform } from "../../generators/get_component";
import type { Vec2 } from "../../math/vec2/Vec2";
import Vec2Math from "../../math/vec2/vec2-math";
import { Vec3 } from "../../math/vec3/vec3";
import type { BoxCollider2D } from "../../components/box-collider-2d/BoxCollider2DTypes";
import type { Bounds } from "../types/Bounds";
import { getBounds } from "../util/getCircleCenter";
import { isOfType } from "../util/isOfType";
const tempA = Vec3.create();
const tempB = Vec3.create();


export function testOverlap(aPos: Vec2, a: ColliderComponent, bPos: Vec2, b: ColliderComponent): boolean {
  if (isOfType<BoxCollider2D>(a, ComponentType.BoxCollider2D) &&
    isOfType<BoxCollider2D>(b, ComponentType.BoxCollider2D)) {

    const offsetA = Vec2Math.add(aPos, a.center);
    const offsetB = Vec2Math.add(bPos, b.center);

    const aTransform = get_transform(a.gameEntity);
    const bTransform = get_transform(b.gameEntity);

    if (!aTransform || !bTransform) return false;

    Vec3.mult(tempA, aTransform.scale, a.size);
    Vec3.mult(tempB, bTransform.scale, b.size);

    const aBounds: Bounds = getBounds(offsetA, tempA);
    const bBounds: Bounds = getBounds(offsetB, tempB);
    return testBoxBoxOverlap(aBounds, bBounds);
  }

  return false;
}
