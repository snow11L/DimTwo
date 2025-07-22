import type { System, SystemStateType } from "./types";

export function addSystem(state: SystemStateType, system: System): void {
    state.systems.push(system);
}

export function createSystemState(): SystemStateType {
    const state = { systems: [] };
    return state;
}