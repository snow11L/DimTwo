
import type { GameEntity } from "../base/GameObject";
import { Id } from "../base/Id";
import { generic_manager_add } from "../managers/generic_manager";
import { Scene } from "../resources/scene/scene";

export function BuildGameEntity(
  name: string,
  tag = "untagged",
): GameEntity {
  const gameEntity: GameEntity = {
    parent: null,
    id: new Id(),
    name,
    tag,
    active: true,
    components: []
  };

  const scene = Scene.getCurrentScene();
  generic_manager_add(scene.entitiesById, gameEntity.id.getValue(), gameEntity);
  generic_manager_add(scene.entitiesByName, gameEntity.name, gameEntity);

  console.debug(`Created GameEntity: ${gameEntity.name} (${gameEntity.id})`);
  return gameEntity;
}
