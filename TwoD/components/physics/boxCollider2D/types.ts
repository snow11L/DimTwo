import type { ComponentOptions } from "../../../base/Component";
import type { Vec3 } from "../../../math/vec3/vec3";
import type { ColliderType } from "../collider/types";

export type BoxColliderOptions = ComponentOptions<BoxCollider2DType>;

export interface BoxCollider2DType extends ColliderType {
  size: Vec3;   
}
