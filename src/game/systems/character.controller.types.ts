import { Component } from "../../engine/core/base/Component";
import { Vec2 } from "../../engine/core/math/Vec2";
import { ComponentGroup, ComponentType } from "../../engine/modules/enums/ComponentType";

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
    super(ComponentType.CharacterController, ComponentGroup.Controller);
    this.direction = new Vec2(0, 0);
    this.speed = 0.5;
    this.runSpeed = 1;
    this.moving = false;
    this.state = "idle";
    this.facing = "down";
  }
}
