import { Meshs } from "../assets/meshs/Meshs";
import { SpriteRender } from "../components/render/spriteRender/SpriteRender";
import type { GameEntity } from "../core/base/GameEntity";

export function createSpriteRender(
  gameEntity: GameEntity
): SpriteRender {

  const r = new SpriteRender();
  r.meshID = Meshs.square.instanceID.getValue();
  r.material = "simple_material";
  r.setGameEntity(gameEntity);
  return r;

}