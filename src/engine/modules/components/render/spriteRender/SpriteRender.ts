import { Render } from "../../../../core/base/Render.ts";
import type { Sprite } from "../../../resources/sprite/types.ts";
import { ComponentGroup, ComponentType } from "../../component-type.ts";

export class SpriteRender extends Render {
  sprite: Sprite | null;
  rotation?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;

  constructor(
    sprite: Sprite | null = null,
    material: string = "",
    layer: number = 0,
    rotation?: number,
    flipHorizontal?: boolean,
    flipVertical?: boolean
  ) {
    super(ComponentType.SpriteRender, ComponentGroup.Render, material);
    this.sprite = sprite;
    this.layer = layer;
    this.rotation = rotation;
    this.flipHorizontal = flipHorizontal;
    this.flipVertical = flipVertical;
  }
}
