
import { Transform } from "../../components/spatial/transform/Transform";
import type { GameEntity } from "../base/GameObject";

export function createTransform(
    entity: GameEntity,
): Transform {

    const transform = new Transform();
    transform.setGameEntity(entity);
 
    return transform;
}