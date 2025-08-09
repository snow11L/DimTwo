import type { Collider } from "../../components/physics/collider/types";

export interface CollisionEvent {
    a: Collider;
    b: Collider;
}

export interface TriggerEvent {
    a: Collider;
    b: Collider;
}