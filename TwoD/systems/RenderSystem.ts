import type { SpriteRenderType, TransformType } from "../components";
import { ComponentState, type ComponentStateType, type System } from "../ecs";
import { material_get } from "../generators/create.material";
import { EasyGetter } from "../managers/EasyGetters";
import { ENGINE } from "../managers/engine.manager";
import { generic_manager_get } from "../managers/generic_manager";
import { ComponentType } from "../types/component-type";

export function SpriteRenderSystem(state: ComponentStateType): System {

  const webGL = ENGINE.WEB_GL;

  return {
    render() {
      webGL.enable(webGL.BLEND);
      webGL.blendFunc(webGL.SRC_ALPHA, webGL.ONE_MINUS_SRC_ALPHA);

      const spriteRenders = ComponentState.getComponentsByType<SpriteRenderType>(state, ComponentType.SpriteRender);

      for (const spriteRender of spriteRenders) {
        if (!spriteRender.enabled) continue;

        const material = material_get(spriteRender.material);
        if (!material) continue;

        const shader = generic_manager_get(ENGINE.MANAGER.SHADER, material.shaderName)!;
        webGL.useProgram(shader.program);

        const transform = ComponentState.getComponent<TransformType>(
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