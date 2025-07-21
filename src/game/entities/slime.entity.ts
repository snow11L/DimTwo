import { Builders } from "../../../api/TwoD";
import { GameEntity } from "../../../core/types/EngineEntity";
import { SLIME_ANIMATOR_CONTROLLER } from "../controllers/slime.animator.controller";
import { SLIME_SPRITE } from "../sprites/slime.sprite";

export function createSlime(name: string) {
  const gameEntity = Builders.createGameEntity(name, "Enemy");

  const transform = Builders.createTransformComponent(gameEntity);
  const spriteReder = Builders.createSpriteRenderComponent(gameEntity, { sprite: SLIME_SPRITE, layer: 1, material: "advanced_material" });
  const animator = Builders.createAnimatorComponent(gameEntity, { controller: SLIME_ANIMATOR_CONTROLLER });
  const circleCollider = Builders.createBoxCollider2D(gameEntity);
  const rigidBody = Builders.createRigidBodyComponent(gameEntity, { useGravity: false });

  GameEntity.addComponents(gameEntity, animator, transform, spriteReder, circleCollider, rigidBody);

  return gameEntity;

}