import type { GameEntity } from "../../core/base/GameEntity";
import { Camera } from "../components/render/camera/Camera";

export function createCameraEntity(gameEntity: GameEntity) {
  const camera = new Camera();
  camera.setGameEntity(gameEntity);
 
  return camera;
}
