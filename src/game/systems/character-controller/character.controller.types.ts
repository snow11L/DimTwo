import { ComponentTypes } from "../../../../TwoD/components/component-type";
import { Component } from "../../../../TwoD/core/base/Component";
import type { Vec2 } from "../../../../TwoD/core/math/vec2/Vec2";
import { Vec3 } from "../../../../TwoD/core/math/vec3/ Vec3";

export type CharacterState = "idle" | "walking" | "attacking";
export type FacingDirection = "up" | "down" | "side";

export class CharacterControler extends Component {
  direction: Vec2;
  speed: number;
  runSpeed: number;
  moving: boolean;
  state: CharacterState;
  facing: FacingDirection;

  constructor() {
    super(ComponentTypes.CharacterController, ComponentTypes.Controller);
    this.direction = new Vec3(0, 0, 0);
    this.speed = 0.5;
    this.runSpeed = 1;
    this.moving = false;
    this.state = "idle";
    this.facing = "down";
  }
}
