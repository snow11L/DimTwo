import type { ColliderComponent as ColliderComponent } from "../../../collider/types/Collider";
import type { Vec3 } from "../../../webgl/vec3";
import type { ComponentOptions } from "../../component/component";

export type BoxColliderOptions = ComponentOptions<AABB2D>;

export interface AABB2D extends ColliderComponent {
  size: Vec3;   
}
