import { ComponentType } from "../../../../api/enums";
import { Components, Enums, type Types, ECS, Input } from "../../../../api/TwoD";
import type { ECSComponentState } from "../../../../api/types";
import { globalKeyState } from "../../input/input.system";
import type { CharacterControlerComponent } from "./character.controller.types";


export default function CharacterControllerAnimationSystem(state: ECSComponentState): Types.System {

  return {
    lateUpdate() {

      const characterControlers = ECS.Component.getComponentsByType<CharacterControlerComponent>(state,  ComponentType.CharacterController);

      for (const characterControler of characterControlers) {

        const spriteRender = ECS.Component.getComponent<Types.SpriteRenderComponent>(
          state,
          characterControler.gameEntity,
          Enums.ComponentType.SpriteRender
        );
        if (!spriteRender) continue;

        const animator = ECS.Component.getComponent<Types.AnimatorComponent>(state, characterControler.gameEntity, Enums.ComponentType.Animator);
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




