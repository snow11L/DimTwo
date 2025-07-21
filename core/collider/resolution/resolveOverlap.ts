import { ComponentType } from "../../types/component-type";
import type { Vec2 } from "../../math/vector2/Vec2";
import type { ColliderComponent } from "../types/Collider";
import { isOfType } from "../util/isOfType";
import { resolveBoxBoxOverlap } from "./resolveBoxBoxCollision";
import { getBounds } from "../util/getCircleCenter";
import type { AABB2D } from "../../gears/collider/box/BoxCollider";
import Vec2Math from "../../math/vector2/vec2-math";
import type { Bounds } from "../types/Bounds";
import { get_transform } from "../../components/get_component";
import { Vec3 } from "../../webgl/vec3";

export interface CollisionResolution {
  dx: number;
  dy: number;
}

const tempSizeA = Vec3.create();
const tempSizeB = Vec3.create();


export function resolveOverlap(aPos: Vec2, a: ColliderComponent, bPos: Vec2, b: ColliderComponent): Vec2 | null {
  if (isOfType<AABB2D>(a, ComponentType.BOX_COLLIDER) &&
    isOfType<AABB2D>(b, ComponentType.BOX_COLLIDER)) {

    const offsetA = Vec2Math.add(aPos, a.center);
    const offsetB = Vec2Math.add(bPos, b.center);

    const aTransform = get_transform(a.gameEntity);
    const bTransform = get_transform(b.gameEntity);


    if (!aTransform || !bTransform) return null;

    Vec3.mult(tempSizeA, aTransform.scale, a.size);
    Vec3.mult(tempSizeB, bTransform.scale, b.size);

    const aBounds: Bounds = getBounds(offsetA, tempSizeA);
    const bBounds: Bounds = getBounds(offsetB, tempSizeB);


    return resolveBoxBoxOverlap(aBounds, bBounds);
  }
  return null;
}

