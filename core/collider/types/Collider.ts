import type { Component } from "../../components/component/component";
import type { Vec3 } from "../../math/vec3/vec3";
import type { CollisionMask } from "./LayerMask";

export interface ColliderComponent extends Component {
  isColliding: boolean;
  center: Vec3;
  isTrigger: boolean;
  collisionMask: CollisionMask;
  ignoreSelfCollisions: boolean;
}

