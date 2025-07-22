import { Meshs } from "../assets/meshs/Meshs";
import type { GameEntityType } from "../base/gameEntity/types";
import type { SpriteRenderOptions, SpriteRenderType } from "../components/render/spriteRender/types";
import { ComponentType } from "../types/component-type";
import { createIncrementalId } from "./create.incremental.id";

export function SpriteRender(
  gameEntity: GameEntityType,
  options: SpriteRenderOptions = {}
): SpriteRenderType {
  return {
    material: "simple_material",
    meshID: Meshs.square.instanceID,
    subMeshs: null,
    instanceID: createIncrementalId(),
    category: ComponentType.Render,
    type: ComponentType.SpriteRender,
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