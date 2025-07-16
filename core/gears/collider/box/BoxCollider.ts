import type { ColliderComponent as ColliderComponent } from "../../../collider/types/Collider";
import type { Vec3 } from "../../../webgl/vec3";
import type { ComponentOptions } from "../../component/component";


export type BoxColliderOptions = ComponentOptions<BoxColliderComponent>;
export interface BoxColliderComponent extends ColliderComponent {
  size: Vec3;   
}
