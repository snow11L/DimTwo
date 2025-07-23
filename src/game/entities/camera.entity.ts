import { Builder, GameEntity, type CameraType, type GameEntityType, type TransformType } from "../../../TwoD/core";

export function createCamera(): GameEntityType {

  const entity: GameEntityType = Builder.BuildGameEntity("camera", "MainCamera");
  const camera: CameraType = Builder.Camera(entity);
  const transform: TransformType = Builder.Transform(entity, { position: { x: 0, y: 0, z: 5 } });

  GameEntity.addComponents(entity, camera, transform);

  return entity;
}