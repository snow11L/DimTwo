import { Component } from "../../../core/base/Component";
import type { AnimationClip } from "../../../core/resources/animation";
import { ComponentTypes } from "../../component-type";

export interface AnimatorState {
  clip: AnimationClip;
  loop: boolean;
}

export interface AnimatorController {
  name: string;
  currentState: string | null;
  states: Record<string, AnimatorState>;
  syncCollider?: boolean;
}


export class Animator extends Component {
  controller: AnimatorController | null;
  currentClip: AnimationClip | null;
  isPlaying: boolean;
  time: number;
  locked: boolean;
  currentFrameIndex: number;
  playbackSpeed: number;

  constructor() {
    super(ComponentTypes.Animator, ComponentTypes.Animator);
    this.controller = null;
    this.currentClip = null;
    this.isPlaying = false;
    this.time = 0;
    this.locked = false;
    this.currentFrameIndex = 0;
    this.playbackSpeed = 1;
  }
}
