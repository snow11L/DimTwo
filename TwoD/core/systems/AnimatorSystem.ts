import { Animator, type AnimatorType, type SpriteRenderType, } from "../components";
import { ComponentTypes } from "../components/component-type";
import { ComponentState, type ComponentStateType, type System } from "../ecs";
import Time from "../time/time";

export function AnimatorSystem(componentState: ComponentStateType): System {
  return {
    lateUpdate() {

      const animators = ComponentState.getComponentsByType<AnimatorType>(componentState, ComponentTypes.Animator);

      for (const animator of animators) {
        if (!animator.enabled || !animator.controller) continue;

        const spriteRender = ComponentState.getComponent<SpriteRenderType>(componentState, animator.gameEntity, ComponentTypes.SpriteRender);
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