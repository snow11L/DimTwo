import type { Component } from "../../base/Component";
import type { GameEntity } from "../../base/GameEntity";

export interface ComponentStateType {
    readonly persistent: Map<string, Map<GameEntity, Component>>;
    readonly transient: Map<string, Map<GameEntity, Component>>;
    readonly category: Map<string, Set<Component>>;
}