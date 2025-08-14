import type { GameEntity } from "../../core/base/GameEntity";
import { Meshs } from "../../resources/meshs/Meshs";
import { SpriteRender } from "../components/render/spriteRender/SpriteRender";

export function createSpriteRender(
  gameEntity: GameEntity
): SpriteRender {

  const r = new SpriteRender();
  r.meshID = Meshs.square.instanceID.getValue();
  r.material = "simple_material";
  r.setGameEntity(gameEntity);
  return r;

}