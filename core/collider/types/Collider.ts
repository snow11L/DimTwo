import type { Component } from "../../gears/component/component";
import type { Vec3 } from "../../webgl/vec3";

enum Layer {
  DEFAULT = 0,
  TREE = 1,
  PLAYER = 2,
  ENEMY = 3,
}

export interface ColliderComponent extends Component {
  isColliding: boolean;
  center: Vec3;
  isTrigger: boolean;
  collisionMask: number;
  ignoreSelfCollisions: boolean;
}
