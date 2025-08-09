import { Animator } from "../components/animation/animator/Animator";
import type { GameEntity } from "../core/base/GameEntity";

export function createAnimator(gameEntity: GameEntity): Animator {
    const animator = new Animator();
    animator.setGameEntity(gameEntity);
    return animator;
   
}