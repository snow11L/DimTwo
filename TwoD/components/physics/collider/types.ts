import type { Component } from "../../../base/Component";
import type { Vec3 } from "../../../math/vec3/vec3";
import type { CollisionMask } from "../collisionMatrix/CollisionMaskTypes";


export interface ColliderType extends Component {
  isColliding: boolean;
  center: Vec3;
  isTrigger: boolean;
  collisionMask: CollisionMask;
  ignoreSelfCollisions: boolean;
}

