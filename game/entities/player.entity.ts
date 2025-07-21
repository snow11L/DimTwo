import { createTextRenderComponent } from "../../core/components/create.text.render.component";
import type { TextMeshXComponent } from "../../core/gears/text_render/TextRender";
import { addComponents } from "../../core/types/EngineEntity";
import { Vec3 } from "../../core/webgl/vec3";
import { ComponentType } from "../../engine/enums";
import { Builders } from "../../engine/TwoD";
import { PLAYER_ANIMATOR_CONTROLLER } from "../controllers/player.animator.controller";
import type { CharacterControlerComponent } from "../systems/character-controller/character.controller.types";

export function createPlayer(
  name: string,
) {
  const gameEntity = Builders.createGameEntity(name, "Player");

  const transform = Builders.createTransformComponent(gameEntity);


  const character_controler: CharacterControlerComponent = {
    instance: Builders.createIncrementalId(),
    gameEntity: gameEntity,
    type: "CHARACTER_CONTROLLER",
    category: "CONTROLLER",
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

  const boxCollider = Builders.createBoxColliderComponent(gameEntity, { center: Vec3.create(0, 0.1) });

  const textRender = createTextRenderComponent(gameEntity);

  addComponents(gameEntity,
    transform,
    character_controler,
    rigidBody,
    boxCollider,
    animator,
    spriteRender,
    textRender
  );

  return gameEntity;
}
