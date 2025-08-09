
import { GameEntity } from "../core/base/GameEntity";
import { Scene } from "../core/resources/scene/scene";

export function BuildGameEntity(
  name: string,
  tag = "untagged",
): GameEntity {

  const gameEntity = new GameEntity(name, tag);

  const scene = Scene.getCurrentScene();

  scene.entitiesById.generic_manager_add(gameEntity.id.getValue(), gameEntity)
  scene.entitiesByName.generic_manager_add(gameEntity.name, gameEntity);

  console.debug(`Created GameEntity: ${gameEntity.name} (${gameEntity.id})`);
  return gameEntity;
}
