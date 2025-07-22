import { get_transform } from "../../generators/get_component";
import type { Vec2 } from "../../math/vec2/Vec2";
import Vec2Math from "../../math/vec2/vec2-math";
import { Vec3 } from "../../math/vec3/vec3";
import { ComponentType } from "../../types/component-type";
import type { Bounds } from "../types/Bounds";
import { getBounds } from "../util/getCircleCenter";
import { isOfType } from "../util/isOfType";
import { Types, BoxCollider2D, CircleCollider2D } from "../../components";


export interface CollisionResolution {
  dx: number;
  dy: number;
}

const tempSizeA = Vec3.create();
const tempSizeB = Vec3.create();

export function resolveOverlap(aPos: Vec2, a: Types.Collider, bPos: Vec2, b: Types.Collider): Vec2 | null {
  if (isOfType<Types.BoxCollider2D>(a, ComponentType.BoxCollider2D) &&
    isOfType<Types.BoxCollider2D>(b, ComponentType.BoxCollider2D)) {

    // const offsetA = Vec2Math.add(aPos, a.center);
    // const offsetB = Vec2Math.add(bPos, b.center);

    // const aTransform = get_transform(a.gameEntity);
    // const bTransform = get_transform(b.gameEntity);

    // if (!aTransform || !bTransform) return null;

    // Vec3.mult(tempSizeA, aTransform.scale, a.size);
    // Vec3.mult(tempSizeB, bTransform.scale, b.size);

    // const aBounds: Bounds = getBounds(offsetA, tempSizeA);
    // const bBounds: Bounds = getBounds(offsetB, tempSizeB);
    // return BoxCollider2D.resolveBoxBoxOverlap(aBounds, bBounds);
  }
if (isOfType<Types.CircleCollider2D>(a, ComponentType.CircleCollider2D) &&
    isOfType<Types.BoxCollider2D>(b, ComponentType.BoxCollider2D)) {

    const offsetA = Vec2Math.add(aPos, a.center);
    const offsetB = Vec2Math.add(bPos, b.center);

    const aTransform = get_transform(a.gameEntity);
    const bTransform = get_transform(b.gameEntity);

    if (!aTransform || !bTransform) return null;

    const effectiveRadius = a.radius * aTransform.scale.x; 

    Vec3.mult(tempSizeB, bTransform.scale, b.size);

    const bBounds: Bounds = getBounds(offsetB, tempSizeB);

    return CircleCollider2D.resolveCircleBoxOverlap(offsetA, effectiveRadius, bBounds);
}



  return null;
}

