import type { Component } from "../../../base/Component";
import type { CollisionMask } from "../../../core/collisionMask/types";


export interface ColliderType extends Component {
  isColliding: boolean;
  center: Mathf.Vec3Type;
  isTrigger: boolean;
  collisionMask: CollisionMask;
  ignoreSelfCollisions: boolean;
}

