import type { ComponentOptions } from "../component/component.types";
import type { Collider } from "../collider/collider.types";

export type CircleColliderOptions = ComponentOptions<CircleCollider2D>;

export interface CircleCollider2D extends Collider {
  radius: number;
  
}