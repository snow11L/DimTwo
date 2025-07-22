import type { CollisionMask } from "../components/types";
import type { Vec3 } from "../math/vec3/vec3";
import type { Component } from "./Component";

export interface Collider extends Component {
  isColliding: boolean;
  center: Vec3;
  isTrigger: boolean;
  collisionMask: CollisionMask;
  ignoreSelfCollisions: boolean;
}

