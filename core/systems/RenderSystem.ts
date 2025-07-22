import { ENGINE } from "../../api/engine.manager";
import { ECS } from "../../api/TwoD";
import type { Transform } from "../components/transform";
import type { SpriteRenderComponent } from "../components/types";
import { material_get } from "../generators/create.material";
import { EasyGetter } from "../managers/EasyGetters";
import { generic_manager_get } from "../managers/generic_manager";
import type { ECSComponentState } from "../resources/ecs/component";
import type { System } from "../resources/ecs/system";
import { ComponentType } from "../types/component-type";

export function SpriteRenderSystem(state: ECSComponentState): System {

  const webGL = ENGINE.WEB_GL;

  return {
    render() {
      webGL.enable(webGL.BLEND);
      webGL.blendFunc(webGL.SRC_ALPHA, webGL.ONE_MINUS_SRC_ALPHA);

      const spriteRenders = ECS.Component.getComponentsByType<SpriteRenderComponent>(state, ComponentType.SpriteRender);

      for (const spriteRender of spriteRenders) {
        if (!spriteRender.enabled) continue;

        const material = material_get(spriteRender.material);
        if (!material) continue;

        const shader = generic_manager_get(ENGINE.MANAGER.SHADER, material.shaderName)!;
        webGL.useProgram(shader.program);

        const transform = ECS.Component.getComponent<Transform>(
          state,
          spriteRender.gameEntity,
          ComponentType.Transform
        );

        if (!transform) continue;

        const shaderSystem = generic_manager_get(ENGINE.MANAGER.SHADER_SYSTEM, material.name);
        if (!shaderSystem) continue;
        shaderSystem.global?.();

        shaderSystem.local?.(spriteRender.gameEntity);

        const mesh = generic_manager_get(ENGINE.MANAGER.MESH, spriteRender.meshID);
        if (!mesh) continue;

        const vao = EasyGetter.getVAO(mesh.instanceID);
        if (!vao) continue;

        console.log("test")

        webGL.bindVertexArray(vao.vao);
        webGL.drawElements(webGL.TRIANGLES, vao.indexCount, webGL.UNSIGNED_SHORT, 0);
        webGL.bindVertexArray(null);
      }
    },
  };
}