import type { Render } from "../base/Render";
import type { TransformType } from "../components";
import { ComponentState, type ComponentStateType, type System } from "../ecs";
import { material_get } from "../generators/create.material";
import { EasyGetter } from "../managers/EasyGetters";
import { Global } from "../managers/engine.manager";
import { generic_manager_get } from "../managers/generic_manager";
import { ComponentType } from "../types/component-type";

export function RenderSystem(state: ComponentStateType): System {

  const webGL = Global.WebGL;

  return {
    render() {
      webGL.enable(webGL.BLEND);
      webGL.blendFunc(webGL.SRC_ALPHA, webGL.ONE_MINUS_SRC_ALPHA);

      const renders = ComponentState.getComponentsByType<Render>(state, ComponentType.Render);

      for (const render of renders) {
        if (!render.enabled) continue;

        const material = material_get(render.material);
        if (!material) continue;

        const shader = generic_manager_get(Global.ResourcesManager.ShaderManager, material.shaderName)!;
        webGL.useProgram(shader.program);

        const transform = ComponentState.getComponent<TransformType>(
          state,
          render.gameEntity,
          ComponentType.Transform
        );

        if (!transform) continue;

        const shaderSystem = generic_manager_get(Global.ResourcesManager.ShaderSystemManager, material.name);
        if (!shaderSystem) continue;
        shaderSystem.global?.();

        shaderSystem.local?.(render.gameEntity);

        const mesh = generic_manager_get(Global.ResourcesManager.MeshManager, render.meshID);
        if (!mesh) continue;

        const vao = EasyGetter.getVAO(mesh.instanceID);
        if (!vao) continue;

        webGL.bindVertexArray(vao.vao);
        webGL.drawElements(webGL.TRIANGLES, vao.indexCount, webGL.UNSIGNED_SHORT, 0);
        webGL.bindVertexArray(null);
      }
    },
  };
}