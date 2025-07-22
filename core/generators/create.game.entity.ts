import { generic_manager_add } from "../managers/generic_manager";
import { Scene } from "../resources/scene/scene";
import type { GameEntity } from "../types/EngineEntity";
import { createIncrementalId } from "./create.incremental.id";

export function createGameEntity(
  name: string,
  tag = "untagged",
): GameEntity {
  const gameEntity: GameEntity = {
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
