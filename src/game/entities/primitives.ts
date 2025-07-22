import { ComponentState, Create } from "../../../TwoD";
import { CIRCLE_SPRITE } from "../../../TwoD/assets/sprites/circle.sprite";
import { SQUARE_SPRITE } from "../../../TwoD/assets/sprites/square.sprite";
import { TRIANGLE_SPRITE } from "../../../TwoD/assets/sprites/triangle.sprite";
import { Color } from "../../../TwoD/math";

import { Scene } from "../../../TwoD/resources/scene/scene";
import type { Sprite } from "../../../TwoD/resources/sprite";

export function createPrimitive(
  name: string,
  sprite: Sprite

) {

  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  const componentState = scene.components;

  const gameEntity = Create.Entity(name, "Player");

  const transform = Create.Transform(gameEntity);
  ComponentState.addComponent(componentState, gameEntity, transform);

  const spriteRender = Create.SpriteRender(gameEntity, {
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