
import { Animator } from "../../components/animation/animator/Animator";
import { ComponentTypes } from "../../components/component-type";
import type { SpriteRender } from "../../components/render/spriteRender/SpriteRender";
import type { System } from "../ecs/systemState/System";
import { Scene } from "../resources/scene/scene";

import Time from "../time/time";

export function AnimatorSystem(): System {
  return {
    lateUpdate() {

      const scene = Scene.getCurrentScene();
      const components = scene.ECSComponents;

      const animators = components.getComponentsByType<Animator>(ComponentTypes.Animator);

      for (const animator of animators) {
        if (!animator.enabled || !animator.controller) continue;

        const spriteRender = components.getComponent<SpriteRender>(animator.getGameEntity(), ComponentTypes.SpriteRender);
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
}