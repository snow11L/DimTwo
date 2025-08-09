// import { Animator, ComponentState, Input, type AnimatorType, type ComponentStateType, type SpriteRenderType, type System } from "../../../../TwoD/core";
// import { ComponentTypes } from "../../../../TwoD/core/components/component-type";
// import { globalKeyState } from "../../../../TwoD/core/systems/InputSystem";
// import type { CharacterControlerComponent } from "./character.controller.types";


// export default function CharacterControllerAnimationSystem(state: ComponentStateType): System {

//   return {
//     lateUpdate() {

//       const characterControlers = ComponentState.getComponentsByType<CharacterControlerComponent>(state,  ComponentTypes.CharacterController);

//       for (const characterControler of characterControlers) {

//         const spriteRender = ComponentState.getComponent<SpriteRenderType>(
//           state,
//           characterControler.getGameEntity(),
//           ComponentTypes.SpriteRender
//         );
//         if (!spriteRender) continue;

//         const animator = ComponentState.getComponent<AnimatorType>(state, characterControler.getGameEntity(), ComponentTypes.Animator);
//         if (!animator) continue;

//         animator.playbackSpeed = Input.getKey(globalKeyState, Input.KeyCode.ShiftLeft) ? 1.5 : 1.0;

//         const dir = characterControler.direction;

//         if (characterControler.direction.x < 0) spriteRender.flipHorizontal = true;
//         else if (characterControler.direction.x > 0) spriteRender.flipHorizontal = false;

//         if (dir.x !== 0 || dir.y !== 0) {
//           if (dir.x !== 0) {
//             Animator.setAnimatorState(animator, "walk_side");
//           } else if (dir.y < 0) {
//             Animator.setAnimatorState(animator, "walk_back");
//           } else if (dir.y > 0) {
//             Animator.setAnimatorState(animator, "walk_front");

//           }
//         } else {
//           Animator.setAnimatorState(animator, "idle");
//         }
//       }
//     },
//   };
// }




