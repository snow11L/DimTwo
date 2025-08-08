import type { Component } from "../../../base/Component";
import type { CollisionMask } from "../../../core/collisionMask/types";
import type { Vec3 } from "../../../math/vec3/ Vec3";

export interface ColliderType extends Component {
  isColliding: boolean;
  center: Vec3;
  isTrigger: boolean;
  collisionMask: CollisionMask;
  ignoreSelfCollisions: boolean;
}

