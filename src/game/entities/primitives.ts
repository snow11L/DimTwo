import { Builder, ComponentState } from "../../../TwoD";
import { CIRCLE_SPRITE } from "../../../TwoD/assets/sprites/circle.sprite";
import { SQUARE_SPRITE } from "../../../TwoD/assets/sprites/square.sprite";
import { TRIANGLE_SPRITE } from "../../../TwoD/assets/sprites/triangle.sprite";
import { Color } from "../../../TwoD/math";

import { Scene } from "../../../TwoD/resources/scene/scene";
import type { SpriteType } from "../../../TwoD/resources/sprite";

export function createPrimitive(
  name: string,
  sprite: SpriteType

) {

  const scene = Scene.getCurrentScene();
  if (scene == null) return;

  const componentState = scene.components;

  const gameEntity = Builder.BuildGameEntity(name, "Player");

  const transform = Builder.Transform(gameEntity);
  ComponentState.addComponent(componentState, gameEntity, transform);

  const spriteRender = Builder.SpriteRender(gameEntity, {
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