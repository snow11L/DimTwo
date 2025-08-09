
import { GameEntity } from "../core/base/GameEntity";
import { generic_manager_add } from "../core/managers/generic_manager";
import { Scene } from "../core/resources/scene/scene";

export function BuildGameEntity(
  name: string,
  tag = "untagged",
): GameEntity {

  const gameEntity = new GameEntity(name, tag);

  const scene = Scene.getCurrentScene();
  generic_manager_add(scene.entitiesById, gameEntity.id.getValue(), gameEntity);
  generic_manager_add(scene.entitiesByName, gameEntity.name, gameEntity);

  console.debug(`Created GameEntity: ${gameEntity.name} (${gameEntity.id})`);
  return gameEntity;
}
