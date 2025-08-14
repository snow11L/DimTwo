
import { GameEntity } from "../../engine/core/base/GameEntity";
import { createAnimator } from "../../engine/modules/generators/create.animator.component";
import { BuildRigidBody2D } from "../../engine/modules/generators/create.rigid.body.component";
import { createSpriteRender } from "../../engine/modules/generators/create.sprite.render.component";
import { createTransform } from "../../engine/modules/generators/create.transform.component";
import { PLAYER_ANIMATOR_CONTROLLER } from "../controllers/player.animator.controller";
import { CharacterControler } from "../systems/character.controller.types";

export function createPlayer(entity: GameEntity) {
  const transform = createTransform(entity);

  const character_controler = new CharacterControler();

  const rigidBody = BuildRigidBody2D(entity);
  rigidBody.useGravity = false;
  rigidBody.mass = 70;

  const spriteRender = createSpriteRender(entity);
  spriteRender.layer = 1;
  spriteRender.material = "advanced_material";

  const animator = createAnimator(entity);
  animator.controller = PLAYER_ANIMATOR_CONTROLLER

  GameEntity.addComponents(
    entity,
    transform,
    character_controler,
    rigidBody,
    animator,
    spriteRender
  );
}
