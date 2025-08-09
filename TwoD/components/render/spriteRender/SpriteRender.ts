import { Render } from "../../../core/base/Render.ts";
import type { Sprite } from "../../../core/resources/sprite/types.ts";
import { ComponentTypes } from "../../component-type.ts";

export class SpriteRender extends Render {
  sprite: Sprite | null;
  rotation?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  layer: number;

  constructor(
    sprite: Sprite | null = null,
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
