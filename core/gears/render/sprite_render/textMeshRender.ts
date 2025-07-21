import { ComponentType } from "../../../types/component-type";
import type { System } from "../../ecs/system";
import { ECS } from "../../../../engine/TwoD";
import type { TransformComponent } from "../../transform";
import { generic_manager_get } from "../../../managers/generic_manager";
import { material_get } from "../../../components/create.material";
import { ENGINE } from "../../../../engine/engine.manager";
import type { ECSComponentState } from "../../ecs/component";
import type { TextMeshXComponent } from "../../text_render/TextRender";

export function TextMeshRenderSystem(state: ECSComponentState): System {

  const webGL = ENGINE.WEB_GL;

  return {
    render() {
      webGL.enable(webGL.BLEND);
      webGL.blendFunc(webGL.SRC_ALPHA, webGL.ONE_MINUS_SRC_ALPHA);

      const texts = ECS.Component.getComponentsByType<TextMeshXComponent>(state, ComponentType.TEXT_RENDER);

      for (const text of texts) {
        if (!text.enabled) continue;
        

        const material = material_get(text.material);
        if (!material) continue;

        const shader = generic_manager_get(ENGINE.MANAGER.SHADER, material.shaderName)!;
        webGL.useProgram(shader.program);

        const transform = ECS.Component.getComponent<TransformComponent>(
          state,
          text.gameEntity,
          ComponentType.TRANSFORM
        );

        if (!transform) continue;
       
        const shaderSystem = generic_manager_get(ENGINE.MANAGER.SHADER_SYSTEM, material.name);
        if (!shaderSystem) continue;
        shaderSystem.global?.();

        shaderSystem.local?.(text.gameEntity);

        const mesh = generic_manager_get(ENGINE.MANAGER.MESH, text.mesh);
        if (!mesh) continue;

        const vao = generic_manager_get(ENGINE.MANAGER.VAO, mesh.name);
        if (!vao) continue;

        webGL.bindVertexArray(vao.vao);
        webGL.drawElements(webGL.TRIANGLES, vao.indexCount, webGL.UNSIGNED_SHORT, 0);
        webGL.bindVertexArray(null);
      }
    },
  };
}