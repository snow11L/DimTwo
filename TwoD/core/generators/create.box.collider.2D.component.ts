import { BoxCollider2D } from "../../components/physics/boxCollider2D/BoxCollider2D";
import type { GameEntity } from "../base/GameObject";

import type { BoxColliderOptions } from "./types";


export function createBoxCollider2D(gameEntity: GameEntity, options?: BoxColliderOptions): BoxCollider2D {
   const c = new BoxCollider2D();
   c.setGameEntity(gameEntity);
   return c;
}