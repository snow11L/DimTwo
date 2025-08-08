import { Builder, type CameraType, type TransformType } from "../../../TwoD/core";
import { GameEntity } from "../../../TwoD/core/base/GameObject";

export function createCamera(): GameEntity {

  const entity: GameEntity = Builder.BuildGameEntity("camera", "MainCamera");
  const camera: CameraType = Builder.Camera(entity);
  const transform: TransformType = Builder.Transform(entity, { position: { x: 0, y: 0, z: 5 } });

  GameEntity.addComponents(entity, camera, transform);

  return entity;
}