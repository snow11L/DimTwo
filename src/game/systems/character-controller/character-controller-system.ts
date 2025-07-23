import { ComponentState, Input, type ComponentStateType, type System, type TransformType } from "../../../../TwoD/core";
import type { TextMeshXComponent } from "../../../../TwoD/core/components/render/textMesh/TextRender";
import { get_component } from "../../../../TwoD/core/generators/get_component";
import Vec2Math from "../../../../TwoD/core/math/vec2/vec2-math";
import { Scene } from "../../../../TwoD/core/resources/scene/scene";
import { globalKeyState } from "../../../../TwoD/core/systems/InputSystem";
import Time from "../../../../TwoD/core/time/time";
import { ComponentTypes } from "../../../../TwoD/core/types/component-type";
import type { CharacterControlerComponent } from "./character.controller.types";



function getGameEntityByName(name: string) {
  const scene = Scene.getCurrentScene();
  return scene.entitiesByName.values.get(name) ?? null;
}

// function updateTextMeshText(textMeshX: TextMeshXComponent, text: string) {
//   const mesh = EasyGetter.getMesh(textMeshX.mesh);
//   if (!mesh) return;

//   const VAO = EasyGetter.getVAO(mesh.name);
//   if (!VAO) return;

//   const fontData = fontManager.getFont(textMeshX.font)!;
//   const newMesh = createTextMesh(text, fontData, 0.002, 100, 32);
//   updateDynamicMesh(ENGINE.WEB_GL, VAO, newMesh);
// }

export default function CharacterControlerSystem(state: ComponentStateType): System {

  let textMesh: TextMeshXComponent | null = null;

  return {

    start() {
      const entity = getGameEntityByName("player");
      if (!entity) return;
      textMesh = get_component<TextMeshXComponent>(entity, ComponentTypes.TextMesh);
    },


    update() {
      const characterControlers = ComponentState.getComponentsByType<CharacterControlerComponent>(
        state,
        ComponentTypes.CharacterController
      );
      for (const characterControler of characterControlers) {

        const characterTransform = ComponentState.getComponent<TransformType>(
          state,
          characterControler.gameEntity,
          ComponentTypes.Transform
        );
        if (!characterTransform) continue;

        if (textMesh) {
          // const text =
          //   `x -> ${characterTransform.position.x.toFixed(2)}\n` +
          //   `y -> ${characterTransform.position.y.toFixed(2)}`
          // updateTextMeshText(textMesh, text)


        }






        characterControler.direction.x = 0;
        characterControler.direction.y = 0;

        if (Input.getKey(globalKeyState, Input.KeyCode.KeyA)) characterControler.direction.x -= 1;
        if (Input.getKey(globalKeyState, Input.KeyCode.KeyD)) characterControler.direction.x += 1;
        if (Input.getKey(globalKeyState, Input.KeyCode.KeyW)) characterControler.direction.y += 1;
        if (Input.getKey(globalKeyState, Input.KeyCode.KeyS)) characterControler.direction.y -= 1;

        characterControler.direction = Vec2Math.normalize(characterControler.direction);

        const speed = Input.getKey(globalKeyState, Input.KeyCode.ShiftLeft)
          ? characterControler.runSpeed
          : characterControler.speed;

        const deltaX = characterControler.direction.x * speed * Time.deltaTime;
        const deltaY = characterControler.direction.y * speed * Time.deltaTime;

        characterTransform.position.x += deltaX;
        characterTransform.position.y += deltaY;
      }
    }
  };
}
