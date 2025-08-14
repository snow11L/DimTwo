import type { Render } from "../../core/base/Render";
import { System } from "../../core/base/System";
import { Global } from "../../core/managers/engine.manager";
import { ResourcesManager } from "../../global/manager/manager";
import { ComponentGroup, ComponentType } from "../components/component-type";
import type { Transform } from "../components/spatial/transform/Transform";
import { material_get } from "../generators/create.material";

export class RenderSystem extends System {

  webGL = Global.WebGL;

  render() {
    const scene = this.getScene();
    const components = scene.components;

    const engine = this.getEngine();
    const shaders = engine.shaders;

    this.webGL.enable(this.webGL.BLEND);
    this.webGL.blendFunc(this.webGL.SRC_ALPHA, this.webGL.ONE_MINUS_SRC_ALPHA);

    const renders = components.getAllByGroup<Render>(ComponentGroup.Render);

    for (const render of renders) {
      if (!render.enabled) continue;
      const entity = render.getGameEntity();

      const material = material_get(render.material);
      if (!material) continue;

      const shader = shaders.get(material.shaderName)!;
      this.webGL.useProgram(shader.program);

      const transform = components.getComponent<Transform>(
        entity,
        ComponentType.Transform
      );

      if (!transform) continue;

      const shaderSystem = ResourcesManager.ShaderSystemManager.get(material.name);
      if (!shaderSystem) continue;
      shaderSystem.global?.(scene, shader);

      shaderSystem.local?.(entity, scene, shader);

      const mesh = ResourcesManager.MeshManager.get(render.meshID);
      if (!mesh) continue;

      const vao = engine.vao.get(mesh.instanceID.getValue());
      if (!vao) continue;

      this.webGL.bindVertexArray(vao.vao);
      this.webGL.drawElements(this.webGL.TRIANGLES, vao.indexCount, this.webGL.UNSIGNED_SHORT, 0);
      this.webGL.bindVertexArray(null);

    }
  }
}