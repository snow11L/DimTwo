import type { ComponentOptions } from "../../components/component/component";
import type { ColliderComponent } from "./Collider";

export type CircleColliderOptions = ComponentOptions<CircleColliderComponent>;

export interface CircleColliderComponent extends ColliderComponent {
  radius: number;
  
}