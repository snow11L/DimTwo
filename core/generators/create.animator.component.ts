import type { GameEntity } from "../base/GameEntity";
import type { Types } from "../components";
import { ComponentType } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";

export function createAnimatorComponent(gameEntity: GameEntity, options?: Types.AnimatorOptions): Types.Animator {
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