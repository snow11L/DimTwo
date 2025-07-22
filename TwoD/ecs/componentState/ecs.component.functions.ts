import type { Component } from "../../base/Component";
import type { GameEntity } from "../../base/GameEntity";
import { addToCategory, removeFromCategory } from "./ecs.component.category.functions";
import type { ComponentStateType } from "./types";

export function createComponentState(): ComponentStateType {
  return {
    persistent: new Map(),
    transient: new Map(),
    category: new Map(),
  };
}

export function addComponent<T extends Component>(
  state: ComponentStateType,
  entity: GameEntity,
  component: T,
  persistent = true
): void {
  const target = persistent ? state.persistent : state.transient;
  if (!target.has(component.type)) {
    target.set(component.type, new Map());
  }
  component.gameEntity = entity;
  target.get(component.type)!.set(entity, component);
  addToCategory(state, component);
}

export function getComponent<T extends Component>(
  state: ComponentStateType,
  entity: GameEntity,
  type: string
): T | null {
  return (
    state.persistent.get(type)?.get(entity) ??
    state.transient.get(type)?.get(entity) ??
    null
  ) as T | null;
}

export function hasComponent(state: ComponentStateType, entity: GameEntity, type: string): boolean {
  return (
    state.persistent.get(type)?.has(entity) ??
    state.transient.get(type)?.has(entity) ??
    false
  );
}

export function removeComponent(state: ComponentStateType, entity: GameEntity, type: string): void {
  for (const source of [state.persistent, state.transient]) {
    const component = source.get(type)?.get(entity);
    if (component) {
      removeFromCategory(state, component);
      source.get(type)!.delete(entity);
    }
  }
}

export function getComponentsByType<T extends Component>(state: ComponentStateType, type: string): T[] {
  return [
    ...(state.persistent.get(type)?.values() ?? []),
    ...(state.transient.get(type)?.values() ?? []),
  ] as T[];
}

export function getComponentsByCategory<T extends Component>(state: ComponentStateType, category: string): T[] {
  return Array.from(state.category.get(category) ?? []) as T[];
}

export function destroyEntityAndComponents(
  ecs: ComponentStateType,
  entity: GameEntity
): void {
 
  for (const [_, map] of ecs.persistent.entries()) {
    const component = map.get(entity);
    if (component) {
      removeFromCategory(ecs, component);
      map.delete(entity);
    }
  }


  for (const [_, map] of ecs.transient.entries()) {
    const component = map.get(entity);
    if (component) {
      removeFromCategory(ecs, component);
      map.delete(entity);
    }
  }
}