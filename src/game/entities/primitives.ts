import { CIRCLE_SPRITE } from "../../../TwoD/assets/sprites/circle.sprite";
import { SQUARE_SPRITE } from "../../../TwoD/assets/sprites/square.sprite";
import { TRIANGLE_SPRITE } from "../../../TwoD/assets/sprites/triangle.sprite";
import { Builder, ComponentState } from "../../../TwoD/core";
import { Color } from "../../../TwoD/core/math/color/color";


import { Scene } from "../../../TwoD/core/resources/scene/scene";
import type { Sprite } from "../../../TwoD/core/resources/sprite";

export function createPrimitive(
  name: string,
  sprite: Sprite

) {

  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  const componentState = scene.components;

  const gameEntity = Builder.BuildGameEntity(name, "Player");

  const transform = Builder.createTransform(gameEntity);
  ComponentState.addComponent(componentState, gameEntity, transform);

  const spriteRender = Builder.createSpriteRender(gameEntity, {
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