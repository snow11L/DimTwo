import type { ColliderType } from "../components/physics/collider/types";

export interface CollisionEvent {
    a: ColliderType;
    b: ColliderType;
}

export interface TriggerEvent {
    a: ColliderType;
    b: ColliderType;
}