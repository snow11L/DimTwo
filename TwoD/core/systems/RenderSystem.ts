import { ComponentTypes } from "../../components/component-type";
import type { Transform } from "../../components/spatial/transform/Transform";
import { material_get } from "../../generators/create.material";
import type { Render } from "../base/Render";
import type { System } from "../ecs/systemState/System";

import { EasyGetter } from "../managers/EasyGetters";
import { Global } from "../managers/engine.manager";
import { Scene } from "../resources/scene/scene";

export function RenderSystem(): System {

  const webGL = Global.WebGL;

  return {
    render() {

      const scene = Scene.getCurrentScene();
      const components = scene.ECSComponents;

      webGL.enable(webGL.BLEND);
      webGL.blendFunc(webGL.SRC_ALPHA, webGL.ONE_MINUS_SRC_ALPHA);

      const renders = components.getComponentsByCategory<Render>(ComponentTypes.Render);

      for (const render of renders) {
        if (!render.enabled) continue;

        const material = material_get(render.material);
        if (!material) continue;

        const shader = Global.ResourcesManager.ShaderManager.generic_manager_get(material.shaderName)!;
        webGL.useProgram(shader.program);

        const transform = components.getComponent<Transform>(
          render.getGameEntity(),
          ComponentTypes.Transform
        );

        if (!transform) continue;



        const shaderSystem = Global.ResourcesManager.ShaderSystemManager.generic_manager_get(material.name);
        if (!shaderSystem) continue;
        shaderSystem.global?.();

        shaderSystem.local?.(render.getGameEntity());

        const mesh = Global.ResourcesManager.MeshManager.generic_manager_get(render.meshID);
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