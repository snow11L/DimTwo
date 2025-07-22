import type { Collider as Collider } from "../collider/collider.types";
import type { Vec3 } from "../../math/vec3/vec3";
import type { ComponentOptions } from "../component/component.types";

export type BoxColliderOptions = ComponentOptions<BoxCollider2D>;

export interface BoxCollider2D extends Collider {
  size: Vec3;   
}
