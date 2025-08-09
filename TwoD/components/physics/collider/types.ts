import { Component } from "../../../core/base/Component";
import type { CollisionMask } from "../../../core/core/collisionMask/types";
import { Vec3 } from "../../../core/math/vec3/ Vec3";
import { ComponentTypes } from "../../component-type";

export class Collider extends Component {
  isColliding: boolean;
  center: Vec3;
  isTrigger: boolean;
  collisionMask: CollisionMask;
  ignoreSelfCollisions: boolean;

  constructor(type: ComponentTypes, category: ComponentTypes) {
    super(type, category);
    this.isColliding = false;
    this.center = new Vec3(0, 0, 0); 
    this.isTrigger = false;
    this.collisionMask = 0; 
    this.ignoreSelfCollisions = false;
  }
}
