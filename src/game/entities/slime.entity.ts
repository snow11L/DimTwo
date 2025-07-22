import { Create } from "../../../TwoD";
import { GameEntityType } from "../../../TwoD/base/GameEntity";
import { SLIME_ANIMATOR_CONTROLLER } from "../controllers/slime.animator.controller";
import { SLIME_SPRITE } from "../sprites/slime.sprite";

export function createSlime(name: string) {
  const gameEntity = Create.GameEntity(name, "Enemy");

  const transform = Create.Transform(gameEntity);
  const spriteReder = Create.SpriteRender(gameEntity, { sprite: SLIME_SPRITE, layer: 1, material: "advanced_material" });
  const animator = Create.Animator(gameEntity, { controller: SLIME_ANIMATOR_CONTROLLER });
  const circleCollider = Create.BoxCollider2D(gameEntity);
  const rigidBody = Create.RigidBody2D(gameEntity, { useGravity: false });

  GameEntityType.addComponents(gameEntity, animator, transform, spriteReder, circleCollider, rigidBody);

  return gameEntity;

}