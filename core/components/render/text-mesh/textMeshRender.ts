import { ENGINE } from "../../../../api/engine.manager";
import type { ECSComponentState } from "../../../resources/ecs/component";
import type { System } from "../../../resources/ecs/system";

export function TextMeshRenderSystem(state: ECSComponentState): System {

  const webGL = ENGINE.WEB_GL;

  return {
    render() {
      // webGL.enable(webGL.BLEND);
      // webGL.blendFunc(webGL.SRC_ALPHA, webGL.ONE_MINUS_SRC_ALPHA);

      // const texts = ECS.Component.getComponentsByType<TextMeshXComponent>(state, ComponentType.TextMesh);

      // for (const text of texts) {
      //   if (!text.enabled) continue;
        

      //   const material = material_get(text.material);
      //   if (!material) continue;

      //   const shader = generic_manager_get(ENGINE.MANAGER.SHADER, material.shaderName)!;
      //   webGL.useProgram(shader.program);

      //   const transform = ECS.Component.getComponent<TransformComponent>(
      //     state,
      //     text.gameEntity,
      //     ComponentType.Transform
      //   );

      //   if (!transform) continue;
       
      //   const shaderSystem = generic_manager_get(ENGINE.MANAGER.SHADER_SYSTEM, material.name);
      //   if (!shaderSystem) continue;
      //   shaderSystem.global?.();

      //   shaderSystem.local?.(text.gameEntity);

      //   const mesh = generic_manager_get(ENGINE.MANAGER.MESH, text.mesh);
      //   if (!mesh) continue;

      //   const vao = EasyGetter.getVAO(mesh.instanceID);
      //   if (!vao) continue;

      //   webGL.bindVertexArray(vao.vao);
      //   webGL.drawElements(webGL.TRIANGLES, vao.indexCount, webGL.UNSIGNED_SHORT, 0);
      //   webGL.bindVertexArray(null);
      // }
    },
  };
}