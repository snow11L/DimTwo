import { System } from "../../core/base/System";
import Time from "../../core/time/time";
import { Animator } from "../components/animation/animator/Animator";
import { ComponentType } from "../components/component-type";
import type { SpriteRender } from "../components/render/spriteRender/SpriteRender";


export class AnimatorSystem extends System {
  lateUpdate() {

    const scene = this.getScene();
    const components = scene.components;

    const animators = components.getAllOfType<Animator>(ComponentType.Animator);

    for (const animator of animators) {
      if (!animator.enabled || !animator.controller) continue;

      const spriteRender = components.getComponent<SpriteRender>(animator.getGameEntity(), ComponentType.SpriteRender);
      if (!spriteRender) continue;

      const result = Animator.getAnimatorState(animator);

      if (!result.ok) {
        console.warn("Animator state error:", result.error);
        continue;
      }

      const state = result.value;

      Animator.advanceFrame(animator, state, Time.deltaTime);
      Animator.updateSprite(animator, state, spriteRender);

    }
  }
}