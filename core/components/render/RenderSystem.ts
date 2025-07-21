import { ENGINE } from "../../../api/engine.manager";
import { ECS } from "../../../api/TwoD";
import { material_get } from "../../generators/create.material";
import { generic_manager_get } from "../../managers/generic_manager";
import { ComponentType } from "../../types/component-type";
import type { ECSComponentState } from "../ecs/component";
import type { System } from "../ecs/system";
import type { SpriteRenderComponent } from "../sprite-render";
import type { TransformComponent } from "../transform";

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

        const transform = ECS.Component.getComponent<TransformComponent>(
          state,
          spriteRender.gameEntity,
          ComponentType.Transform
        );

        if (!transform) continue;

        const shaderSystem = generic_manager_get(ENGINE.MANAGER.SHADER_SYSTEM, material.name);
        if (!shaderSystem) continue;
        shaderSystem.global?.();

        shaderSystem.local?.(spriteRender.gameEntity);

        const mesh = generic_manager_get(ENGINE.MANAGER.MESH, spriteRender.mesh);
        if (!mesh) continue;

        const vao = generic_manager_get(ENGINE.MANAGER.VAO, mesh.instanceID);
        if (!vao) continue;

        webGL.bindVertexArray(vao.vao);
        webGL.drawElements(webGL.TRIANGLES, vao.indexCount, webGL.UNSIGNED_SHORT, 0);
        webGL.bindVertexArray(null);
      }
    },
  };
}