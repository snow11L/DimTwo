import type { GameEntity } from "../../core/base/GameEntity";
import { Animator } from "../components/animation/Animator";

export function createAnimator(gameEntity: GameEntity): Animator {
    const animator = new Animator();
    animator.setGameEntity(gameEntity);
    return animator;
   
}