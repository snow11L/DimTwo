import { Create } from "../../../TwoD";
import { GameEntity } from "../../../TwoD/base/GameEntity";

export function createCamera() {

  const entity = Create.Entity("camera", "MainCamera");

  const camera = Create.Camera(entity);
  const transform = Create.Transform(entity, { position: { x: 0, y: 0, z: 5} });

  GameEntity.addComponents(entity, camera, transform);

  return entity;
}