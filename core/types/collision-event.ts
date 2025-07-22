import type { Collider } from "../base/Collider";

export interface CollisionEvent {
    a: Collider;
    b: Collider;
}

export interface TriggerEvent {
    a: Collider;
    b: Collider;
}