import { Component, type Clonable } from "../../../core/base/Component";
import { Result } from "../../../core/managers/result";
import { ComponentGroup, ComponentType } from "../../enums/ComponentType";
import type { AnimationClip } from "../../resources/animation";
import type { SpriteRender } from "../render/SpriteRender";
import type { AnimatorController } from "./AnimatorController";
import type { AnimatorState } from "./AnimatorState";

export interface AnimatorOptions {
  controller?: AnimatorController | null;
  currentClip?: AnimationClip | null;
  isPlaying?: boolean;
  time?: number;
  locked?: boolean;
  currentFrameIndex?: number;
  playbackSpeed?: number;
}

export class Animator extends Component implements Clonable<Animator> {
  controller: AnimatorController | null;
  currentClip: AnimationClip | null;
  isPlaying: boolean;
  time: number;
  locked: boolean;
  currentFrameIndex: number;
  playbackSpeed: number;

  constructor(options: AnimatorOptions = {}) {
    super(ComponentType.Animator, ComponentGroup.Animator);
    this.controller = options.controller ?? null;
    this.currentClip = options.currentClip ?? null;
    this.isPlaying = options.isPlaying ?? false;
    this.time = options.time ?? 0;
    this.locked = options.locked ?? false;
    this.currentFrameIndex = options.currentFrameIndex ?? 0;
    this.playbackSpeed = options.playbackSpeed ?? 1;
  }

  clone(): Animator {
    return new Animator({
      controller: this.controller,
      currentClip: this.currentClip,
      isPlaying: this.isPlaying,
      time: this.time,
      locked: this.locked,
      currentFrameIndex: this.currentFrameIndex,
      playbackSpeed: this.playbackSpeed,
    });
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
