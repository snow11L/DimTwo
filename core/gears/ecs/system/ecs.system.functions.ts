import type { ECSSystemState, System } from "./ecs.system.types";

export function addSystem(state: ECSSystemState, system: System): void {
    state.systems.push(system);
}

export function createSystemState(): ECSSystemState {
    const state = { systems: [] };
    return state;
}