import type { ComponentOptions } from "../component/component.types.ts";
import type { Render } from "../render/Render.ts";
import type { Sprite } from "../../resources/sprite/sprite.types.ts";

export type SpriteRenderOptions = ComponentOptions<SpriteRenderComponent>;



export interface SpriteRenderComponent extends Render {
  sprite: Sprite | null;
  rotation?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  layer: number;
}

