import { Builder } from "../../engine/core";
import { GameEntity } from "../../engine/core/base/GameEntity";
import type { Camera } from "../../engine/modules/components/render/camera/types";
import type { Transform } from "../../engine/modules/components/spatial/transform/Transform";

export function createCamera(): GameEntity {

  const entity: GameEntity = Builder.BuildGameEntity("camera", "MainCamera");
  const camera: Camera = Builder.createCamera(entity);
  const transform: Transform = Builder.createTransform(entity);
  transform.position.z = 5;

  GameEntity.addComponents(entity, camera, transform);

  return entity;
}