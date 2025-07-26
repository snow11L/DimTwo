import { Meshs } from "../../assets/meshs/Meshs";
import type { GameEntityType } from "../base/gameEntity/types";
import { ComponentTypes } from "../components/component-type";
import type { SpriteRenderType } from "../components/render/spriteRender/types";
import { createIncrementalId } from "./create.incremental.id";
import type { SpriteRenderOptions } from "./types";

export function SpriteRender(
  gameEntity: GameEntityType,
  options: SpriteRenderOptions = {}
): SpriteRenderType {
  return {
    material: "simple_material",
    meshID: Meshs.square.instanceID,
    subMeshs: null,
    instanceID: createIncrementalId(),
    category: ComponentTypes.Render,
    type: ComponentTypes.SpriteRender,
    gameEntity: gameEntity,
    sprite: null,
    color: { r: 1, g: 1, b: 1, a: 1 },
    alpha: 1.0,
    rotation: 0,
    flipHorizontal: false,
    flipVertical: false,
    layer: 0,
    enabled: true,
    ...options,
  }
}