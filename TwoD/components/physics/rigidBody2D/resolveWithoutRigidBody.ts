import type { Vec2 } from "../../../math/vec2/Vec2";
import type { TransformType } from "../../spatial";
import { applyResolution } from "./applyResolution";

export function resolveWithoutRigidBody(
  aTransform: TransformType,
  bTransform: TransformType,
  resolution: Vec2,
) {
  applyResolution(aTransform, resolution, 0.5);
  applyResolution(bTransform, resolution, -0.5);
}