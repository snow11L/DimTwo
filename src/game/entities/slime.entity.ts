
import { GameEntity } from "../../engine/core/base/GameEntity";
import type { Animator } from "../../engine/modules/components/animation/animator/Animator";
import type { RigidBody2D } from "../../engine/modules/components/physics/rigidBody2D/RigidBody";
import type { SpriteRender } from "../../engine/modules/components/render/spriteRender/SpriteRender";
import type { Transform } from "../../engine/modules/components/spatial/transform/Transform";
import { createAnimator } from "../../engine/modules/generators/create.animator.component";
import { BuildRigidBody2D } from "../../engine/modules/generators/create.rigid.body.component";
import { createSpriteRender } from "../../engine/modules/generators/create.sprite.render.component";
import { createTransform } from "../../engine/modules/generators/create.transform.component";

import { SLIME_ANIMATOR_CONTROLLER } from "../controllers/slime.animator.controller";
import { SLIME_SPRITE } from "../sprites/slime.sprite";

export function createSlime(entity: GameEntity){
  const transform: Transform = createTransform(entity);
  const spriteReder: SpriteRender = createSpriteRender(entity);
  spriteReder.sprite = SLIME_SPRITE;
  spriteReder.layer = 1;
  spriteReder.material = "advanced_material";

  const animator: Animator = createAnimator(entity);
  animator.controller = SLIME_ANIMATOR_CONTROLLER;

  const rigidBody: RigidBody2D = BuildRigidBody2D(entity);
  rigidBody.useGravity = false;
  GameEntity.addComponents(entity, animator, transform, spriteReder, rigidBody);

}