import { ComponentTypes } from "../../components/component-type";
import type { Transform } from "../../components/spatial/transform/Transform";
import type { Render } from "../base/Render";
import { ComponentState, type ComponentStateType, type System } from "../ecs";
import { material_get } from "../generators/create.material";
import { EasyGetter } from "../managers/EasyGetters";
import { Global } from "../managers/engine.manager";
import { generic_manager_get } from "../managers/generic_manager";

export function RenderSystem(state: ComponentStateType): System {

  const webGL = Global.WebGL;

  return {
    render() {
      webGL.enable(webGL.BLEND);
      webGL.blendFunc(webGL.SRC_ALPHA, webGL.ONE_MINUS_SRC_ALPHA);

      const renders = ComponentState.getComponentsByCategory<Render>(state, ComponentTypes.Render);

      for (const render of renders) {
        if (!render.enabled) continue;

        const material = material_get(render.material);
        if (!material) continue;

        const shader = generic_manager_get(Global.ResourcesManager.ShaderManager, material.shaderName)!;
        webGL.useProgram(shader.program);

        const transform = ComponentState.getComponent<Transform>(
          state,
          render.getGameEntity(),
          ComponentTypes.Transform
        );

        if (!transform) continue;

        

        const shaderSystem = generic_manager_get(Global.ResourcesManager.ShaderSystemManager, material.name);
        if (!shaderSystem) continue;
        shaderSystem.global?.();

        shaderSystem.local?.(render.getGameEntity());

        const mesh = generic_manager_get(Global.ResourcesManager.MeshManager, render.meshID);
        if (!mesh) continue;

        const vao = EasyGetter.getVAO(mesh.instanceID.getValue());
        if (!vao) continue;

        webGL.bindVertexArray(vao.vao);
        webGL.drawElements(webGL.TRIANGLES, vao.indexCount, webGL.UNSIGNED_SHORT, 0);
        webGL.bindVertexArray(null);
      
      }
    },
  };
}