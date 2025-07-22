import { Builders, ECS } from "../../../api/TwoD";
import type { Sprite } from "../../../api/types";
import { CIRCLE_SPRITE } from "../../../core/assets/sprites/circle.sprite";
import { SQUARE_SPRITE } from "../../../core/assets/sprites/square.sprite";
import { TRIANGLE_SPRITE } from "../../../core/assets/sprites/triangle.sprite";
import { Color } from "../../../core/math/color/color";
import { Scene } from "../../../core/resources/scene/scene";

export function createPrimitive(
  name: string,
  sprite: Sprite

) {

  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  const componentState = scene.components;

  const gameEntity = Builders.createGameEntity(name, "Player");

  const transform = Builders.createTransformComponent(gameEntity);
  ECS.Component.addComponent(componentState, gameEntity, transform);

  const spriteRender = Builders.createSpriteRenderComponent(gameEntity, {
    layer: 1,
    material: "advanced_material",
    sprite: sprite,
    color: Color.random()
  });
  ECS.Component.addComponent(componentState, gameEntity, spriteRender);

  return gameEntity;
}

export const Primitives = {
  circle: createPrimitive("circle_primitive", CIRCLE_SPRITE),
  square: createPrimitive("square_primitive", SQUARE_SPRITE),
  triangle: createPrimitive("triangle_primitive", TRIANGLE_SPRITE),
}