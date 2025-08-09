import type { AnimatorType } from "../../components/animation";
import { Animator } from "../../components/animation/animator/types";
import type { GameEntity } from "../base/GameObject";

export function createAnimator(gameEntity: GameEntity): AnimatorType {
    const animator = new Animator();
    animator.setGameEntity(gameEntity);
    return animator;
   
}