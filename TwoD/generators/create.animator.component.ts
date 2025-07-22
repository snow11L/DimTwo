import type { GameEntityType } from "../base/GameEntity";
import type { AnimatorOptions, AnimatorType } from "../components";
import { ComponentType } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";

export function Animator(gameEntity: GameEntityType, options?: AnimatorOptions): AnimatorType {
    return {
        instanceID: createIncrementalId(),
        category: ComponentType.Animator,
        controller: null,
        currentClip: null,
        currentFrameIndex: 0,
        enabled: true,
        gameEntity: gameEntity,
        isPlaying: false,
        locked: false,
        playbackSpeed: 1,
        time: 0,
        type: ComponentType.Animator,
        ...options
    };
}