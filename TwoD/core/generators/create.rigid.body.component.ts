
import { RigidBody2D } from "../../components/physics/rigidBody2D/RigidBody";
import type { GameEntity } from "../base/GameObject";

export function BuildRigidBody2D(
    gameEntity: GameEntity,
): RigidBody2D {
    const rigidBody = new RigidBody2D();
    rigidBody.setGameEntity(gameEntity);
    return rigidBody;
   
}
