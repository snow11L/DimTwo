import type { Vec2 } from "../../math/vec2/Vec2";

export interface SpriteType {
  textureName: string;
  position: Vec2;
  origin: Vec2;
  size: Vec2;
  meshName: string | null;
}
