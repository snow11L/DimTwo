import type { Component } from "../../../base/Component";
import type { GameEntity } from "../../../types/EngineEntity";
import { createComponentState } from "./ecs.component.functions";

export interface ECSComponentState {
    readonly persistent: Map<string, Map<GameEntity, Component>>;
    readonly transient: Map<string, Map<GameEntity, Component>>;
    readonly category: Map<string, Set<Component>>;

}

export const COMPONENT_STATE = createComponentState();




