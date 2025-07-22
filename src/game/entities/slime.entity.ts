import { Builder, GameEntity, type AnimatorType, type BoxCollider2DType, type GameEntityType, type RigidBody2DType, type SpriteRenderType, type TransformType } from "../../../TwoD";
import { SLIME_ANIMATOR_CONTROLLER } from "../controllers/slime.animator.controller";
import { SLIME_SPRITE } from "../sprites/slime.sprite";

export function createSlime(name: string): GameEntityType {
  const gameEntity: GameEntityType = Builder.BuildGameEntity(name, "Enemy");
  const transform: TransformType = Builder.Transform(gameEntity);
  const spriteReder: SpriteRenderType = Builder.SpriteRender(gameEntity, { sprite: SLIME_SPRITE, layer: 1, material: "advanced_material" });
  const animator: AnimatorType = Builder.Animator(gameEntity, { controller: SLIME_ANIMATOR_CONTROLLER });
  const circleCollider: BoxCollider2DType = Builder.BoxCollider2D(gameEntity);
  const rigidBody: RigidBody2DType = Builder.BuildRigidBody2D(gameEntity, { useGravity: false });
  GameEntity.addComponents(gameEntity, animator, transform, spriteReder, circleCollider, rigidBody);

  return gameEntity;

}