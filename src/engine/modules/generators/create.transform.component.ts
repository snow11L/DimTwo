
import type { GameEntity } from "../../core/base/GameEntity";
import { Transform } from "../components/spatial/Transform";

export function createTransform(
    entity: GameEntity,
): Transform {

    const transform = new Transform();
    transform.setGameEntity(entity);
 
    return transform;
}