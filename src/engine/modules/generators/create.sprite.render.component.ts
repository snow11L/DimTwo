import type { GameEntity } from "../../core/base/GameEntity";
import { SpriteRender } from "../components/render/spriteRender/SpriteRender";

export function createSpriteRender(
  gameEntity: GameEntity
): SpriteRender {

  const r = new SpriteRender();
  r.meshName = "fillSquare";
  r.material = "simple_material";
  r.setGameEntity(gameEntity);
  return r;

}