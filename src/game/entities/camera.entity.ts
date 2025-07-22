import { Create } from "../../../TwoD";
import { GameEntityType } from "../../../TwoD/base/GameEntity";

export function createCamera() {

  const entity = Create.GameEntity("camera", "MainCamera");

  const camera = Create.Camera(entity);
  const transform = Create.Transform(entity, { position: { x: 0, y: 0, z: 5} });

  GameEntityType.addComponents(entity, camera, transform);

  return entity;
}