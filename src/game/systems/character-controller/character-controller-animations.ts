import type { System } from "../../../engine/core/ecs/System";
import { SceneManager } from "../../../engine/core/scene/SceneManager";
import { Animator } from "../../../engine/modules/components/animation/animator/Animator";
import { ComponentTypes } from "../../../engine/modules/components/component-type";
import { SpriteRender } from "../../../engine/modules/components/render/spriteRender/SpriteRender";
import { WebKeyCode } from "../../../engine/modules/webInput/WebKeyCode";
import type { CharacterControler } from "./character.controller.types";
import { Input } from "./InputSystem";

export default function CharacterControllerAnimationSystem(): System {

    return {
        lateUpdate() {

            const scene =SceneManager.getCurrentScene();
            const components = scene.ECSComponents;

            const characterControlers = components.getComponentsByType<CharacterControler>( ComponentTypes.CharacterController);

            for (const characterControler of characterControlers) {

                const spriteRender = components.getComponent<SpriteRender>(
                    characterControler.getGameEntity(),
                    ComponentTypes.SpriteRender
                );
                if (!spriteRender) continue;

                const animator = components.getComponent<Animator>(characterControler.getGameEntity(), ComponentTypes.Animator);
                if (!animator) continue;

                animator.playbackSpeed = Input.keyboard.getKey(WebKeyCode.ShiftLeft) ? 1.5 : 1.0;

                const dir = characterControler.direction;

                if (characterControler.direction.x < 0) spriteRender.flipHorizontal = true;
                else if (characterControler.direction.x > 0) spriteRender.flipHorizontal = false;

                if (dir.x !== 0 || dir.y !== 0) {
                    if (dir.x !== 0) {
                        Animator.setAnimatorState(animator, "walk_side");
                    } else if (dir.y < 0) {
                        Animator.setAnimatorState(animator, "walk_back");
                    } else if (dir.y > 0) {
                        Animator.setAnimatorState(animator, "walk_front");

                    }
                } else {
                    Animator.setAnimatorState(animator, "idle");
                }
            }
        },
    };
}




