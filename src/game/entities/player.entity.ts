
import { Builder } from "../../../TwoD/core";
import { GameEntity } from "../../../TwoD/core/base/GameEntity";

import { PLAYER_ANIMATOR_CONTROLLER } from "../controllers/player.animator.controller";
import { CharacterControler } from "../systems/character-controller/character.controller.types";

export function createPlayer(
  name: string,
) {
  const gameEntity = Builder.BuildGameEntity(name, "Player");

  const transform = Builder.createTransform(gameEntity);

  const character_controler = new CharacterControler();

  const rigidBody = Builder.BuildRigidBody2D(gameEntity);
  rigidBody.useGravity = false;
  rigidBody.mass = 70;

  const spriteRender = Builder.createSpriteRender(gameEntity);
  spriteRender.layer = 1;
  spriteRender.material = "advanced_material";

  const animator = Builder.createAnimator(gameEntity);
  animator.controller =  PLAYER_ANIMATOR_CONTROLLER

  GameEntity.addComponents(
    gameEntity,
    transform,
    character_controler,
    rigidBody,
    animator,
    spriteRender
  );

  return gameEntity;
}
