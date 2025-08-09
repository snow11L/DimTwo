import type { System } from "../../../../engine/core/ecs/System";
import { Vec2 } from "../../../../engine/core/math/vec2/Vec2";
import { SceneManager } from "../../../../engine/core/scene/SceneManager";
import Time from "../../../../engine/core/time/time";
import { ComponentTypes } from "../../../../engine/modules/components/component-type";
import type { TextMeshXComponent } from "../../../../engine/modules/components/render/textMesh/TextRender";
import type { Transform } from "../../../../engine/modules/components/spatial/transform/Transform";
import { get_component } from "../../../../engine/modules/generators/get_component";
import { WebKeyCode } from "../../../../engine/modules/webInput/WebKeyCode";

import type { CharacterControler } from "./character.controller.types";
import { Input } from "./InputSystem";



function getGameEntityByName(name: string) {
  const scene =SceneManager.getCurrentScene();
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

        const scene =SceneManager.getCurrentScene();
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

        if (Input.keyboard.getKey(WebKeyCode.KeyA)) characterControler.direction.x -= 1;
        if (Input.keyboard.getKey(WebKeyCode.KeyD)) characterControler.direction.x += 1;
        if (Input.keyboard.getKey(WebKeyCode.KeyW)) characterControler.direction.y += 1;
        if (Input.keyboard.getKey(WebKeyCode.KeyS)) characterControler.direction.y -= 1;

        Vec2.normalize(characterControler.direction, characterControler.direction);
        const speed = Input.keyboard.getKey(WebKeyCode.ShiftLeft)
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
