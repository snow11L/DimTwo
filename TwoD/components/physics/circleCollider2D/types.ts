import type { ComponentOptions } from "../../../base/Component";
import type { ColliderType } from "../collider/types";


export type CircleColliderOptions = ComponentOptions<CircleCollider2DType>;

export interface CircleCollider2DType extends ColliderType {
  radius: number;
  
}