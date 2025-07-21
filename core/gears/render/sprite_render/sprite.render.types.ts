import { Render } from "../../../../engine/TwoD.ts";
import type { Color } from "../../../../game/systems/procedural-world/color.ts";
import type { Component, ComponentOptions } from "../../component/component.ts";
import type { Sprite } from "../../sprite/sprite.types.ts";

export type SpriteRenderOptions = ComponentOptions<SpriteRenderComponent>;

export interface Render extends Component {
  color: Color;
  alpha?: number;
  material: string;
  mesh: string;
}

export interface SpriteRenderComponent extends Render {
  sprite: Sprite | null;
  rotation?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  layer: number;
}

