import { ComponentType } from "../types/component-type";
import type { GameEntity } from "../types/EngineEntity";
import type { SpriteRenderComponent, SpriteRenderOptions } from "../components/sprite-render/sprite.render.types";
import { createIncrementalId } from "./create.incremental.id";
import { Meshs } from "../assets/meshs/Meshs";

export function createSpriteRenderComponent(
  gameEntity: GameEntity,
  options: SpriteRenderOptions = {}
): SpriteRenderComponent {
  return {
    material: "simple_material",
    mesh: Meshs.square.instanceID,
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