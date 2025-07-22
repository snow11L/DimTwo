import type { Vec3 } from "../../math/vec3/vec3";
import type { CollisionMask } from "../../physics/collision/CollisionMatrix";
import type { Component } from "../component/component.types";

export interface Collider extends Component {
  isColliding: boolean;
  center: Vec3;
  isTrigger: boolean;
  collisionMask: CollisionMask;
  ignoreSelfCollisions: boolean;
}

