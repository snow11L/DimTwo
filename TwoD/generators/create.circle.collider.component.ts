
import { CircleCollider2D } from "../components/physics/circleCollider2D/CircleCollider2D";
import type { GameEntity } from "../core/base/GameEntity";

export function createCircleCollider2D(gameEntity: GameEntity): CircleCollider2D {
    const c = new CircleCollider2D();
    c.setGameEntity(gameEntity);
    return c;
}