import type { Component } from "../../../../core/base/Component";
import type { Vec2 } from "../../../../core/math/vec2/Vec2";

export type CharacterState = "idle" | "walking" | "attacking";
export type FacingDirection = "up" | "down" | "side";

export interface CharacterControlerComponent extends Component {
  direction: Vec2;
  speed: number;
  runSpeed: number;
  moving: boolean;
  state: CharacterState;
  facing: FacingDirection;
}