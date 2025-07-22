import type { Vec2 } from "../../../math/vec2/Vec2";
import type { TransformType } from "../../spatial";

export function applyResolution(transform: TransformType, resolution: Vec2, factor: number) {
  transform.position.x += resolution.x * factor;
  transform.position.y += resolution.y * factor;
}
