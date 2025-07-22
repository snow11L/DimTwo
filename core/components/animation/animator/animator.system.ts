
import type { Types } from "../..";
import { Animator } from "../../../../api/components";
import { ECS } from "../../../../api/TwoD";
import type { ECSComponentState } from "../../../resources/ecs/component";
import type { System } from "../../../resources/ecs/system";
import Time from "../../../time/time";
import { ComponentType } from "../../../types/component-type";
import type { SpriteRenderComponent } from "../../types";

export function AnimatorSystem(componentState: ECSComponentState): System {
  return {
    lateUpdate() {

      const animators = ECS.Component.getComponentsByType<Types.Animator>(componentState, ComponentType.Animator);

      for (const animator of animators) {
        if (!animator.enabled || !animator.controller) continue;

        const spriteRender = ECS.Component.getComponent<SpriteRenderComponent>(componentState,animator.gameEntity, ComponentType.SpriteRender);
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