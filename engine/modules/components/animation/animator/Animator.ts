import { Component } from "../../../../core/base/Component";
import { Result } from "../../../../core/managers/result";
import type { AnimationClip } from "../../../resources/animation";
import { ComponentTypes } from "../../component-type";
import type { SpriteRender } from "../../render/spriteRender/SpriteRender";

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

  public static startClip(animator: Animator, clip: AnimationClip, lock: boolean) {
    animator.currentClip = clip;
    animator.currentFrameIndex = 0;
    animator.time = 0;
    animator.isPlaying = true;
    animator.locked = lock;
  }

  public static setAnimation(animator: Animator, animationClip: AnimationClip, lock = false) {
    if (animator.currentClip === animationClip || animator.locked) return;
    this.startClip(animator, animationClip, lock);
  }

  public static setAnimatorState(animator: Animator, newStateName: string, lock: boolean = false) {
    const controller = animator.controller;
    if (!controller || animator.locked || controller.currentState === newStateName) return;

    const newState = controller.states[newStateName];
    if (!newState) {
      console.warn(`AnimatorController: estado "${newStateName}" não encontrado.`);
      return;
    }

    controller.currentState = newStateName;
    this.startClip(animator, newState.clip, lock);
  }


  public static advanceFrame(
    animator: Animator,
    state: AnimatorState,
    delta: number
  ) {
    const clip = state.clip;
    if (!clip) return;

    const frameDuration = 1 / clip.frameRate;
    animator.time += delta * animator.playbackSpeed;

    while (animator.time >= frameDuration) {
      animator.time -= frameDuration;
      animator.currentFrameIndex++;

      if (animator.currentFrameIndex >= clip.frames.length) {
        if (state.loop) {
          animator.currentFrameIndex = 0;
        } else {
          animator.currentFrameIndex = clip.frames.length - 1;
          animator.isPlaying = false;
          animator.locked = false;
          break;
        }
      }
    }
  }

  public static updateSprite(animator: Animator, state: AnimatorState, spriteRender: SpriteRender) {
    const animationClip = state.clip;
    if (!animationClip) return;

    const frameIndex = animator.currentFrameIndex;
    if (frameIndex < 0 || frameIndex >= animationClip.frames.length) return;

    const frame = animationClip.frames[frameIndex];
    spriteRender.sprite = frame.sprite;
  }


  public static getAnimatorState(animator: Animator): Result<AnimatorState> {
    const controller = animator.controller;
    if (!controller) return Result.err("No controller assigned to animator.");

    const stateName = controller.currentState;
    if (!stateName) return Result.err("No current state set in controller.");

    const state = controller.states[stateName];
    if (!state) return Result.err(`State "${stateName}" not found in controller.`);

    return Result.ok(state);
  }
}
