
import { Transform } from "../components/spatial/transform/Transform";
import type { GameEntity } from "../core/base/GameEntity";

export function createTransform(
    entity: GameEntity,
): Transform {

    const transform = new Transform();
    transform.setGameEntity(entity);
 
    return transform;
}