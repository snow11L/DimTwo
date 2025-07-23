import type { ComponentTypes } from "../../component-type";
import type { ColliderType } from "./types";

export function isOfType<T extends ColliderType>(c: ColliderType, type: ComponentTypes): c is T {
  return c.type === type;
}
