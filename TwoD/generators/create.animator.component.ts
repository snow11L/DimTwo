import type { GameEntityType } from "../base/gameEntity/types";
import type { AnimatorType } from "../components";
import { ComponentTypes } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";
import type { AnimatorOptions } from "./types";

export function Animator(gameEntity: GameEntityType, options?: AnimatorOptions): AnimatorType {
    return {
        instanceID: createIncrementalId(),
        category: ComponentTypes.Animator,
        controller: null,
        currentClip: null,
        currentFrameIndex: 0,
        enabled: true,
        gameEntity: gameEntity,
        isPlaying: false,
        locked: false,
        playbackSpeed: 1,
        time: 0,
        type: ComponentTypes.Animator,
        ...options
    };
}