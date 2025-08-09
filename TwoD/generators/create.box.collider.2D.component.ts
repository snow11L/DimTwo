import { BoxCollider2D } from "../components/physics/boxCollider2D/BoxCollider2D";
import type { GameEntity } from "../core/base/GameEntity";

export function createBoxCollider2D(gameEntity: GameEntity): BoxCollider2D {
   const c = new BoxCollider2D();
   c.setGameEntity(gameEntity);
   return c;
}