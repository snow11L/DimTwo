import type { CollisionMask } from "../components/physics/collider/CollisionMatrix";
import type { Vec3 } from "../math/vec3/vec3";
import type { Component } from "./Component";

export interface Collider extends Component {
  isColliding: boolean;
  center: Vec3;
  isTrigger: boolean;
  collisionMask: CollisionMask;
  ignoreSelfCollisions: boolean;
}

