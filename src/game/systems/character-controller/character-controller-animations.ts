import { Animator } from "../../../../TwoD/components/animation/animator/Animator";
import { ComponentTypes } from "../../../../TwoD/components/component-type";
import { SpriteRender } from "../../../../TwoD/components/render/spriteRender/SpriteRender";
import { Input } from "../../../../TwoD/core";
import type { System } from "../../../../TwoD/core/ecs/systemState/System";
import { Scene } from "../../../../TwoD/core/resources/scene/scene";
import { globalKeyState } from "../../../../TwoD/core/systems/InputSystem";
import type { CharacterControler } from "./character.controller.types";

export default function CharacterControllerAnimationSystem(): System {

    return {
        lateUpdate() {

            const scene = Scene.getCurrentScene();
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

                animator.playbackSpeed = Input.getKey(globalKeyState, Input.KeyCode.ShiftLeft) ? 1.5 : 1.0;

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




