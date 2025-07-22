
import { Builder, GameEntity, Mathf } from "../../../TwoD";

import { ComponentTypes } from "../../../TwoD/types/component-type";
import { PLAYER_ANIMATOR_CONTROLLER } from "../controllers/player.animator.controller";
import type { CharacterControlerComponent } from "../systems/character-controller/character.controller.types";

export function createPlayer(
  name: string,
) {
  const gameEntity = Builder.BuildGameEntity(name, "Player");

  const transform = Builder.Transform(gameEntity);

  const character_controler: CharacterControlerComponent = {
    instanceID: Builder.createIncrementalId(),
    gameEntity: gameEntity,
    type: ComponentTypes.CharacterController,
    category: ComponentTypes.Controller,
    enabled: true,
    facing: "side",
    state: "idle",
    direction: { x: 0, y: 0 },
    moving: false,
    speed: 0.5,
    runSpeed: 1,
  };


  const rigidBody2DOptions: Builder.RigidBodyOptions = {
    useGravity: false,
    mass: 70
  }

  const rigidBody = Builder.BuildRigidBody2D(gameEntity, rigidBody2DOptions);

  const spriteRender = Builder.SpriteRender(gameEntity, {
    layer: 1,
    material: "advanced_material",
  });

  const animator = Builder.Animator(gameEntity, {
    controller: PLAYER_ANIMATOR_CONTROLLER,
  });

  const boxCollider = Builder.BoxCollider2D(gameEntity, { center: Mathf.Vec3.create(0, 0.1) });
  const circleCollider = Builder.CircleCollider2D(gameEntity);

  GameEntity.addComponents(
    gameEntity,
    transform,
    character_controler,
    rigidBody,
    animator,
    boxCollider,
    circleCollider,
    spriteRender
  );

  return gameEntity;
}
