import { System } from "../../engine/core/base/System";
import { Animator } from "../../engine/modules/components/animation/Animator";
import type { SpriteRender } from "../../engine/modules/components/render/SpriteRender";
import { ComponentType } from "../../engine/modules/enums/ComponentType";
import { WebKeyCode } from "../../engine/modules/webInput/WebKeyCode";
import { CharacterControler } from "./character.controller.types";
import { Input } from "./InputSystem";


export class CharacterControllerAnimationSystem extends System {

    lateUpdate() {
        const scene = this.getScene();
        const components = scene.components;

        const characterControlers = components.getAllOfType<CharacterControler>(ComponentType.CharacterController);

        for (const characterControler of characterControlers) {

            const spriteRender = components.getComponent<SpriteRender>(
                characterControler.getGameEntity(),
                ComponentType.SpriteRender
            );
            if (!spriteRender) continue;

            const animator = components.getComponent<Animator>(characterControler.getGameEntity(), ComponentType.Animator);
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
    }
}




