import type { ColliderComponent } from "../collider/types/Collider";

export interface CollisionEvent {
    a: ColliderComponent;
    b: ColliderComponent;
}

export interface TriggerEvent {
    a: ColliderComponent;
    b: ColliderComponent;
}