import type { GameEntity } from "../base/GameObject";
import { Id } from "../base/Id";
import type { AnimatorType } from "../components";
import { ComponentTypes } from "../components/component-type";
import type { AnimatorOptions } from "./types";

export function Animator(gameEntity: GameEntity, options?: AnimatorOptions): AnimatorType {
    return {
        instanceID: new Id(),
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