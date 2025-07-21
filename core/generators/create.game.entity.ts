import { ENGINE } from "../../api/engine.manager";
import { generic_manager_add } from "../managers/generic_manager";
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

  if (ENGINE.MANAGER.GAME_ENTITY_BY_NAME.values.has(name)) {
    console.warn(`GameEntity with name "${name}" already exists. Overwriting.`);
  }

  generic_manager_add(ENGINE.MANAGER.GAME_ENTITY_BY_ID, gameEntity.id, gameEntity);
  generic_manager_add(ENGINE.MANAGER.GAME_ENTITY_BY_NAME, gameEntity.name, gameEntity);

  console.debug(`Created GameEntity: ${gameEntity.name} (${gameEntity.id})`);
  return gameEntity;
}
