import type { Collider } from "../../components/collider/collider.types";
import type { ComponentType } from "../../types/component-type";

export function isOfType<T extends Collider>(c: Collider, type: ComponentType): c is T {
  return c.type === type;
}
