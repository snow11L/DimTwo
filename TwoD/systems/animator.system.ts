import { Animator } from "../../api/components";
import type { ComponentStateType, SpriteRenderType, System } from "../../api/types";
import type { AnimatorType } from "../components";
import { ComponentState } from "../ecs";
import Time from "../time/time";
import { ComponentType } from "../types/component-type";

export function AnimatorSystem(componentState: ComponentStateType): System {
  return {
    lateUpdate() {

      const animators = ComponentState.getComponentsByType<AnimatorType>(componentState, ComponentType.Animator);

      for (const animator of animators) {
        if (!animator.enabled || !animator.controller) continue;

        const spriteRender = ComponentState.getComponent<SpriteRenderType>(componentState,animator.gameEntity, ComponentType.SpriteRender);
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