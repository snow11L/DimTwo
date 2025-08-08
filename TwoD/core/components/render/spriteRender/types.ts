import { Render } from "../../../base/Render.ts";
import { ComponentTypes } from "../../../components/component-type";
import type { SpriteType } from "../../../resources/sprite/types.ts";

export class SpriteRenderType extends Render {
  sprite: SpriteType | null;
  rotation?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  layer: number;

  constructor(
    sprite: SpriteType | null = null,
    material: string = "",
    layer: number = 0,
    rotation?: number,
    flipHorizontal?: boolean,
    flipVertical?: boolean
  ) {
    super(ComponentTypes.SpriteRender, ComponentTypes.Render, material);
    this.sprite = sprite;
    this.layer = layer;
    this.rotation = rotation;
    this.flipHorizontal = flipHorizontal;
    this.flipVertical = flipVertical;
  }
}
