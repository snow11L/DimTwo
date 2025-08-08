import type { ColliderType } from "../../..";
import type { Vec3 } from "../../../math/vec3/ Vec3";

export interface BoxCollider2DType extends ColliderType {
  size: Vec3;
}
