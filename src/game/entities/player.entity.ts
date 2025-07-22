import { createCircleColliderComponent } from "../../../api/builders";
import { Builders } from "../../../api/TwoD";
import { addComponents } from "../../../TwoD/base/GameEntity";
import { createTextRenderComponent } from "../../../TwoD/generators/create.text.render.component";
import { Vec3 } from "../../../TwoD/math/vec3/vec3";
import { ComponentType } from "../../../TwoD/types/component-type";
import { PLAYER_ANIMATOR_CONTROLLER } from "../controllers/player.animator.controller";
import type { CharacterControlerComponent } from "../systems/character-controller/character.controller.types";

export function createPlayer(
  name: string,
) {
  const gameEntity = Builders.createGameEntity(name, "Player");

  const transform = Builders.createTransformComponent(gameEntity  );

  const character_controler: CharacterControlerComponent = {
    instanceID: Builders.createIncrementalId(),
    gameEntity: gameEntity,
    type: ComponentType.CharacterController,
    category: ComponentType.Controller,
    enabled: true,
    facing: "side",
    state: "idle",
    direction: { x: 0, y: 0 },
    moving: false,
    speed: 0.5,
    runSpeed: 1,
  };

  const rigidBody = Builders.createRigidBodyComponent(gameEntity, {
    useGravity: false,
    mass: 70
  });

  const spriteRender = Builders.createSpriteRenderComponent(gameEntity, {
    layer: 1,
    material: "advanced_material",
  });

  const animator = Builders.createAnimatorComponent(gameEntity, {
    controller: PLAYER_ANIMATOR_CONTROLLER,
  });

  const boxCollider = Builders.createBoxCollider2D(gameEntity, { center: Vec3.create(0, 0.1) });
  const textRender = createTextRenderComponent(gameEntity);
  const circleCollider = createCircleColliderComponent(gameEntity);

  addComponents(
    gameEntity,

    transform,
    character_controler,
    rigidBody,
    animator,
    boxCollider,
    circleCollider,
    spriteRender,
    textRender
  );

  return gameEntity;
}
