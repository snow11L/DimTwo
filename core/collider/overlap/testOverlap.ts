import { ComponentType } from "../../types/component-type";
import { testBoxBoxOverlap } from "./testBoxBoxOverlap";
import type { ColliderComponent } from "../types/Collider";
import type { Vec2 } from "../../Vec2/Vec2";
import { isOfType } from "../util/isOfType";
import Vec2Math from "../../Vec2/vec2-math";
import { getBounds } from "../util/getCircleCenter";
import type { Bounds } from "../types/Bounds";
import type { BoxColliderComponent } from "../../gears/collider/box/BoxCollider";
import { get_transform } from "../../builders/get_component";
import { Vec3 } from "../../webgl/vec3";

const tempA = Vec3.create();
const tempB = Vec3.create();


export function testOverlap(aPos: Vec2, a: ColliderComponent, bPos: Vec2, b: ColliderComponent): boolean {
  if (isOfType<BoxColliderComponent>(a, ComponentType.BOX_COLLIDER) &&
    isOfType<BoxColliderComponent>(b, ComponentType.BOX_COLLIDER)) {

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
