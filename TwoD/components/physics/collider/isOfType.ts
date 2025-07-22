import type { ComponentType } from "../../../types/component-type";
import type { ColliderType } from "./types";

export function isOfType<T extends ColliderType>(c: ColliderType, type: ComponentType): c is T {
  return c.type === type;
}
