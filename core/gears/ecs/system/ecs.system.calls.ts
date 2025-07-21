import type { CollisionEvent, TriggerEvent } from "../../../types/collision-event";
import { Scene } from "../../scene/scene";
import type { ECSSystemState } from "./ecs.system.types";

export function callStart(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.SYSTEM_STATE.systems) {
    system.start?.();
  }
}

export function callFixedUpdate(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.SYSTEM_STATE.systems) {
    system.fixedUpdate?.();
  }
}

export function callUpdate(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.SYSTEM_STATE.systems) {
    system.update?.();
  }
}

export function callLateUpdate(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.SYSTEM_STATE.systems) {
    system.lateUpdate?.();
  }
}

export function callRender(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.SYSTEM_STATE.systems) {
    system.render?.();
  }
}

export function callDrawGizmos(): void {
  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  for (const system of scene.SYSTEM_STATE.systems) {
    system.onDrawGizmos?.();
  }
}

export function callCollisionEnterEvents(state: ECSSystemState, event: CollisionEvent): void {
  for (const system of state.systems) {
    system.onCollisionEnter?.(event);
  }
}

export function callCollisionStayEvents(state: ECSSystemState, event: CollisionEvent): void {
  for (const system of state.systems) {
    system.onCollisionStay?.(event);
  }
}

export function callCollisionExitEvents(state: ECSSystemState, event: CollisionEvent): void {
  for (const system of state.systems) {
    system.onCollisionExit?.(event);
  }
}

export function callTriggerEnterEvents(state: ECSSystemState, event: TriggerEvent): void {
  for (const system of state.systems) {
    system.onTriggerEnter?.(event);
  }
}

export function callTriggerStayEvents(state: ECSSystemState, event: TriggerEvent): void {
  for (const system of state.systems) {
    system.onTriggerStay?.(event);
  }
}

export function callTriggerExitEvents(state: ECSSystemState, event: TriggerEvent): void {
  for (const system of state.systems) {
    system.onTriggerExit?.(event);
  }
}