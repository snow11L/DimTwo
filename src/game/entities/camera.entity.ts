import { GameEntity } from "../../engine/core/base/GameEntity";
import type { Camera } from "../../engine/modules/components/render/camera/Camera";
import type { Transform } from "../../engine/modules/components/spatial/transform/Transform";
import { createCameraEntity as createCameraComponent } from "../../engine/modules/generators/create.camera.component";
import { createTransform as createTransformComponent } from "../../engine/modules/generators/create.transform.component";

export function createCamera(entity: GameEntity){
  const camera: Camera = createCameraComponent(entity);
  const transform: Transform = createTransformComponent(entity);
  transform.position.z = 5;

  GameEntity.addComponents(entity, camera, transform);
}