import type { ComponentOptions } from "../component/component.ts";
import type { Render } from "../render/Render.ts";
import type { Sprite } from "../sprite/sprite.types.ts";

export type SpriteRenderOptions = ComponentOptions<SpriteRenderComponent>;



export interface SpriteRenderComponent extends Render {
  sprite: Sprite | null;
  rotation?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  layer: number;
}

