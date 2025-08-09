
import { CircleCollider2D } from "../../components/physics/circleCollider2D/CircleCollider2D";
import type { GameEntity } from "../base/GameObject";
import type { CircleColliderOptions } from "./types";

export function createCircleCollider2D(gameEntity: GameEntity, options?: CircleColliderOptions): CircleCollider2D {
    const c = new CircleCollider2D();
    c.setGameEntity(gameEntity);
    return c;
}