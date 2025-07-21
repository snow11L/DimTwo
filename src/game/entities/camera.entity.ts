import { Builders } from "../../../api/TwoD";
import { GameEntity } from "../../../core/types/EngineEntity";

export function createCamera() {

  const entity = Builders.createGameEntity("camera", "MainCamera");

  const camera = Builders.createCameraComponent(entity);
  const transform = Builders.createTransformComponent(entity, { position: { x: 0, y: 0, z: 5 } });

  GameEntity.addComponents(entity, camera, transform);

  return entity;
}