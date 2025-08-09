import type { Camera } from "../../../TwoD/components/render/camera/types";
import type { Transform } from "../../../TwoD/components/spatial/transform/Transform";
import { Builder } from "../../../TwoD/core";
import { GameEntity } from "../../../TwoD/core/base/GameObject";

export function createCamera(): GameEntity {

  const entity: GameEntity = Builder.BuildGameEntity("camera", "MainCamera");
  const camera: Camera = Builder.createCamera(entity);
  const transform: Transform = Builder.createTransform(entity);
  transform.position.z = 5;

  GameEntity.addComponents(entity, camera, transform);

  return entity;
}