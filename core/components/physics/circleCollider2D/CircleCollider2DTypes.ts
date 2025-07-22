import type { Collider, ComponentOptions } from "../../types";

export type CircleColliderOptions = ComponentOptions<CircleCollider2D>;

export interface CircleCollider2D extends Collider {
  radius: number;
  
}