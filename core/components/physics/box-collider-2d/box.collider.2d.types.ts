import type { Collider } from "../../../base/Collider";
import type { ComponentOptions } from "../../../base/Component";
import type { Vec3 } from "../../../math/vec3/vec3";

export type BoxColliderOptions = ComponentOptions<BoxCollider2D>;

export interface BoxCollider2D extends Collider {
  size: Vec3;   
}
