
import { AnimationLib, type AnimatorType } from "../../components/animation";
import { ComponentTypes } from "../../components/component-type";
import type { SpriteRender } from "../../components/render/spriteRender/SpriteRender";
import { ComponentState, type ComponentStateType, type System } from "../ecs";
import Time from "../time/time";

export function AnimatorSystem(componentState: ComponentStateType): System {
  return {
    lateUpdate() {

      const animators = ComponentState.getComponentsByType<AnimatorType>(componentState, ComponentTypes.Animator);

      for (const animator of animators) {
        if (!animator.enabled || !animator.controller) continue;

        const spriteRender = ComponentState.getComponent<SpriteRender>(componentState, animator.getGameEntity(), ComponentTypes.SpriteRender);
        if (!spriteRender) continue;

        const result = AnimationLib.getAnimatorState(animator);

        if (!result.ok) {
          console.warn("Animator state error:", result.error);
          continue;
        }

        const state = result.value;

       AnimationLib.advanceFrame(animator, state, Time.deltaTime);
       AnimationLib.updateSprite(animator, state, spriteRender);

      }
    }
  }
}