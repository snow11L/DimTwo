import { Builders } from "../../../api/TwoD";
import type { Sprite } from "../../../api/types";
import { ComponentState } from "../../../TwoD";
import { CIRCLE_SPRITE } from "../../../TwoD/assets/sprites/circle.sprite";
import { SQUARE_SPRITE } from "../../../TwoD/assets/sprites/square.sprite";
import { TRIANGLE_SPRITE } from "../../../TwoD/assets/sprites/triangle.sprite";
import { Color } from "../../../TwoD/math";

import { Scene } from "../../../TwoD/resources/scene/scene";

export function createPrimitive(
  name: string,
  sprite: Sprite

) {

  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  const componentState = scene.components;

  const gameEntity = Builders.createGameEntity(name, "Player");

  const transform = Builders.createTransformComponent(gameEntity);
  ComponentState.addComponent(componentState, gameEntity, transform);

  const spriteRender = Builders.createSpriteRenderComponent(gameEntity, {
    layer: 1,
    material: "advanced_material",
    sprite: sprite,
    color: Color.random()
  });
  ComponentState.addComponent(componentState, gameEntity, spriteRender);

  return gameEntity;
}

export const Primitives = {
  circle: createPrimitive("circle_primitive", CIRCLE_SPRITE),
  square: createPrimitive("square_primitive", SQUARE_SPRITE),
  triangle: createPrimitive("triangle_primitive", TRIANGLE_SPRITE),
}