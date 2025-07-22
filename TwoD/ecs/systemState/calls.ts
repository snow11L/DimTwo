import { Scene } from "../../resources/scene/scene";
import type { CollisionEvent, TriggerEvent } from "../../types/collision-event";
import type { SystemStateType } from "./types";

export function callStart(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.systems.systems) {
    system.start?.();
  }
}

export function callFixedUpdate(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.systems.systems) {
    system.fixedUpdate?.();
  }
}

export function callUpdate(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.systems.systems) {
    system.update?.();
  }
}

export function callLateUpdate(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.systems.systems) {
    system.lateUpdate?.();
  }
}

export function callRender(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.systems.systems) {
    system.render?.();
  }
}

export function callDrawGizmos(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.systems.systems) {
    system.onDrawGizmos?.();
  }
}

export function callCollisionEnterEvents(state: SystemStateType, event: CollisionEvent): void {
  for (const system of state.systems) {
    system.onCollisionEnter?.(event);
  }
}

export function callCollisionStayEvents(state: SystemStateType, event: CollisionEvent): void {
  for (const system of state.systems) {
    system.onCollisionStay?.(event);
  }
}

export function callCollisionExitEvents(state: SystemStateType, event: CollisionEvent): void {
  for (const system of state.systems) {
    system.onCollisionExit?.(event);
  }
}

export function callTriggerEnterEvents(state: SystemStateType, event: TriggerEvent): void {
  for (const system of state.systems) {
    system.onTriggerEnter?.(event);
  }
}

export function callTriggerStayEvents(state: SystemStateType, event: TriggerEvent): void {
  for (const system of state.systems) {
    system.onTriggerStay?.(event);
  }
}

export function callTriggerExitEvents(state: SystemStateType, event: TriggerEvent): void {
  for (const system of state.systems) {
    system.onTriggerExit?.(event);
  }
}