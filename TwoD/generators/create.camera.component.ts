import { Camera } from "../components/render/camera/types";
import type { GameEntity } from "../core/base/GameEntity";

export function createCamera(gameEntity: GameEntity) {
  const camera = new Camera();
  camera.setGameEntity(gameEntity);
 
  return camera;
}
