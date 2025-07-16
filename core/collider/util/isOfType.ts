import type { ComponentType } from "../../types/component-type";
import type { ColliderComponent } from "../types/Collider";

export function isOfType<T extends ColliderComponent>(c: ColliderComponent, type: ComponentType): c is T {
  return c.type === type;
}
