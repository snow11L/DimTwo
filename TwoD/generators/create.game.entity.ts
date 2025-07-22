import type { GameEntityType } from "../base/GameEntity";
import { generic_manager_add } from "../managers/generic_manager";
import { Scene } from "../resources/scene/scene";
import { createIncrementalId } from "./create.incremental.id";

export function GameEntity(
  name: string,
  tag = "untagged",
): GameEntityType {
  const gameEntity: GameEntityType = {
    parent: null,
    id: createIncrementalId(),
    name,
    tag,
    active: true,
    components: []
  };

  const scene = Scene.getCurrentScene();
  generic_manager_add(scene.entitiesById, gameEntity.id, gameEntity);
  generic_manager_add(scene.entitiesByName, gameEntity.name, gameEntity);

  console.debug(`Created GameEntity: ${gameEntity.name} (${gameEntity.id})`);
  return gameEntity;
}
