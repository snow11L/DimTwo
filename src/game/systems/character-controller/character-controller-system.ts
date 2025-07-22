import { ComponentType } from "../../../../api/enums";
import { ECS, Enums, Input, Types } from "../../../../api/TwoD";
import type { ECSComponentState } from "../../../../api/types";
import type { TextMeshXComponent } from "../../../../core/components/render/textMesh/TextRender";
import { get_component } from "../../../../core/generators/get_component";
import Vec2Math from "../../../../core/math/vec2/vec2-math";
import { Scene } from "../../../../core/resources/scene/scene";
import Time from "../../../../core/time/time";
import { globalKeyState } from "../../input/input.system";
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

export default function CharacterControlerSystem(state: ECSComponentState): Types.System {

  let textMesh: TextMeshXComponent | null = null;

  return {

    start() {
      const entity = getGameEntityByName("player");
      if (!entity) return;
      textMesh = get_component<TextMeshXComponent>(entity, ComponentType.TextMesh);
    },


    update() {
      const characterControlers = ECS.Component.getComponentsByType<CharacterControlerComponent>(
        state,
        ComponentType.CharacterController
      );
      for (const characterControler of characterControlers) {

        const characterTransform = ECS.Component.getComponent<Types.Transform>(
          state,
          characterControler.gameEntity,
          Enums.ComponentType.Transform
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
