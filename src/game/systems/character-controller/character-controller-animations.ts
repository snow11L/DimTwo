
import { Components, Input, type Types } from "../../../../api/TwoD";
import type { ComponentStateType } from "../../../../api/types";
import { ComponentState, type AnimatorType } from "../../../../TwoD";
import { ComponentType } from "../../../../TwoD/types/component-type";
import { globalKeyState } from "../../input/input.system";
import type { CharacterControlerComponent } from "./character.controller.types";


export default function CharacterControllerAnimationSystem(state: ComponentStateType): Types.System {

  return {
    lateUpdate() {

      const characterControlers = ComponentState.getComponentsByType<CharacterControlerComponent>(state,  ComponentType.CharacterController);

      for (const characterControler of characterControlers) {

        const spriteRender = ComponentState.getComponent<Types.SpriteRenderType>(
          state,
          characterControler.gameEntity,
          ComponentType.SpriteRender
        );
        if (!spriteRender) continue;

        const animator = ComponentState.getComponent<AnimatorType>(state, characterControler.gameEntity, ComponentType.Animator);
        if (!animator) continue;

        animator.playbackSpeed = Input.getKey(globalKeyState, Input.KeyCode.ShiftLeft) ? 1.5 : 1.0;

        const dir = characterControler.direction;

        if (characterControler.direction.x < 0) spriteRender.flipHorizontal = true;
        else if (characterControler.direction.x > 0) spriteRender.flipHorizontal = false;

        if (dir.x !== 0 || dir.y !== 0) {
          if (dir.x !== 0) {
            Components.Animator.setAnimatorState(animator, "walk_side");
          } else if (dir.y < 0) {
            Components.Animator.setAnimatorState(animator, "walk_back");
          } else if (dir.y > 0) {
            Components.Animator.setAnimatorState(animator, "walk_front");

          }
        } else {
          Components.Animator.setAnimatorState(animator, "idle");
        }
      }
    },
  };
}




