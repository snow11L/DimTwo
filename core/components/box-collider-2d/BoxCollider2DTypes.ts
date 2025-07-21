import type { ColliderComponent as ColliderComponent } from "../../collider/types/Collider";
import type { Vec3 } from "../../math/vec3/vec3";
import type { ComponentOptions } from "../component/component";

export type BoxColliderOptions = ComponentOptions<BoxCollider2D>;

export interface BoxCollider2D extends ColliderComponent {
  size: Vec3;   
}
