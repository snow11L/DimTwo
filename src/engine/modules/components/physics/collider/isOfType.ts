import type { ComponentType } from "../../component-type";
import type { Collider } from "./types";

export function isOfType<T extends Collider>(c: Collider, type: ComponentType): c is T {
  return c.type === type;
}
