import type { Component } from "../../gears/component/component";
import type { Vec3 } from "../../webgl/vec3";
import type { CollisionMask } from "./LayerMask";

export interface ColliderComponent extends Component {
  isColliding: boolean;
  center: Vec3;
  isTrigger: boolean;
  collisionMask: CollisionMask;
  ignoreSelfCollisions: boolean;
}

