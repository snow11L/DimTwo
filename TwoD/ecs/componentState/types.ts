import type { Component } from "../../base/Component";
import type { GameEntityType } from "../../base/GameEntity";

export interface ComponentStateType {
    readonly persistent: Map<string, Map<GameEntityType, Component>>;
    readonly transient: Map<string, Map<GameEntityType, Component>>;
    readonly category: Map<string, Set<Component>>;
}