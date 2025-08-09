import type { ComponentTypes } from "../../component-type";
import type { Collider } from "./types";

export function isOfType<T extends Collider>(c: Collider, type: ComponentTypes): c is T {
  return c.type === type;
}
