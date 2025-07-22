import type { ComponentOptions } from "../../../base/Component.ts";
import type { Render } from "../../../base/Render.ts";
import type { SpriteType } from "../../../resources/sprite/types.ts";

export type SpriteRenderOptions = ComponentOptions<SpriteRenderType>;

export interface SpriteRenderType extends Render {
  sprite: SpriteType | null;
  rotation?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  layer: number;
}

