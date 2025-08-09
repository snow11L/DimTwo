import type { AnimatorType } from "../../../TwoD/components/animation";
import type { RigidBody2D } from "../../../TwoD/components/physics/rigidBody2D/RigidBody";
import type { SpriteRender } from "../../../TwoD/components/render/spriteRender/SpriteRender";
import type { Transform } from "../../../TwoD/components/spatial/transform/Transform";

import { GameEntity } from "../../../TwoD/core/base/GameEntity";
import { BuildGameEntity, BuildRigidBody2D, createAnimator, createSpriteRender, createTransform } from "../../../TwoD/generators";
import { SLIME_ANIMATOR_CONTROLLER } from "../controllers/slime.animator.controller";
import { SLIME_SPRITE } from "../sprites/slime.sprite";

export function createSlime(name: string): GameEntity {
  const gameEntity: GameEntity = BuildGameEntity(name, "Enemy");
  const transform: Transform = createTransform(gameEntity);
  const spriteReder: SpriteRender = createSpriteRender(gameEntity);
  spriteReder.sprite = SLIME_SPRITE;
  spriteReder.layer = 1;
  spriteReder.material = "advanced_material";

  const animator: AnimatorType = createAnimator(gameEntity);
  animator.controller = SLIME_ANIMATOR_CONTROLLER;

  const rigidBody: RigidBody2D = BuildRigidBody2D(gameEntity);
  rigidBody.useGravity = false;
  GameEntity.addComponents(gameEntity, animator, transform, spriteReder, rigidBody);

  return gameEntity;

}