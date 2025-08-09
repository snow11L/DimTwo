import { ComponentTypes } from "../../../../TwoD/components/component-type";
import type { TextMeshXComponent } from "../../../../TwoD/components/render/textMesh/TextRender";
import type { Transform } from "../../../../TwoD/components/spatial/transform/Transform";
import { Input } from "../../../../TwoD/core";
import type { System } from "../../../../TwoD/core/ecs/systemState/System";
import { Vec2 } from "../../../../TwoD/core/math/vec2/Vec2";
import { Scene } from "../../../../TwoD/core/resources/scene/scene";
import { globalKeyState } from "../../../../TwoD/core/systems/InputSystem";
import Time from "../../../../TwoD/core/time/time";
import { get_component } from "../../../../TwoD/generators/get_component";
import type { CharacterControler } from "./character.controller.types";



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

export default function CharacterControlerSystem(): System {

  let textMesh: TextMeshXComponent | null = null;

  return {

    start() {
      const entity = getGameEntityByName("player");
      if (!entity) return;
      textMesh = get_component<TextMeshXComponent>(entity, ComponentTypes.TextMesh);
    },


    update() {

        const scene = Scene.getCurrentScene();
            const components = scene.ECSComponents;

      const characterControlers = components.getComponentsByType<CharacterControler>(
        ComponentTypes.CharacterController
      );
      for (const characterControler of characterControlers) {

        const characterTransform = components.getComponent<Transform>(
          characterControler.getGameEntity(),
          ComponentTypes.Transform
        );
        if (!characterTransform) continue;


        characterControler.direction.x = 0;
        characterControler.direction.y = 0;

        if (Input.getKey(globalKeyState, Input.KeyCode.KeyA)) characterControler.direction.x -= 1;
        if (Input.getKey(globalKeyState, Input.KeyCode.KeyD)) characterControler.direction.x += 1;
        if (Input.getKey(globalKeyState, Input.KeyCode.KeyW)) characterControler.direction.y += 1;
        if (Input.getKey(globalKeyState, Input.KeyCode.KeyS)) characterControler.direction.y -= 1;

        Vec2.normalize(characterControler.direction, characterControler.direction);
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
