
import type { GameEntity } from "../../core/base/GameEntity";
import { RigidBody2D } from "../components/physics/RigidBody2D";

export function BuildRigidBody2D(
    gameEntity: GameEntity,
): RigidBody2D {
    const rigidBody = new RigidBody2D();
    rigidBody.setGameEntity(gameEntity);
    return rigidBody;
   
}
