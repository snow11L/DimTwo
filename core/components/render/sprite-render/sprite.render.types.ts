import type { ComponentOptions } from "../../../base/Component.ts";
import type { Render } from "../../../base/Render.ts";
import type { Sprite } from "../../../resources/sprite/sprite.types.ts";

export type SpriteRenderOptions = ComponentOptions<SpriteRenderComponent>;



export interface SpriteRenderComponent extends Render {
  sprite: Sprite | null;
  rotation?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  layer: number;
}

