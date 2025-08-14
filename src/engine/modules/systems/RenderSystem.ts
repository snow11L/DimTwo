import type { Render } from "../../core/base/Render";
import { System } from "../../core/base/System";
import { ResourcesManager } from "../../global/manager/manager";
import { ComponentGroup, ComponentType } from "../components/component-type";
import type { Transform } from "../components/spatial/transform/Transform";
import { material_get } from "../generators/create.material";

export class RenderSystem extends System {

  render() {
    const scene = this.getScene();
    const components = scene.components;

    const engine = this.getEngine();
    const shaders = engine.shaders;
    const gl = engine.gl;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const renders = components.getAllByGroup<Render>(ComponentGroup.Render);

    for (const render of renders) {
      if (!render.enabled) continue;
      const entity = render.getGameEntity();

      const material = material_get(render.material);
      if (!material) continue;

      const shader = shaders.get(material.shaderName)!;
      gl.useProgram(shader.program);

      const transform = components.getComponent<Transform>(
        entity,
        ComponentType.Transform
      );

      if (!transform) continue;

      const shaderSystem = ResourcesManager.ShaderSystemManager.get(material.name);
      if (!shaderSystem) continue;
      shaderSystem.global?.(scene, shader);

      shaderSystem.local?.(entity, scene, shader);

      const mesh = ResourcesManager.MeshManager.get(render.meshName);
      if (!mesh) continue;

      const vao = engine.buffers.get(mesh.name);
      if (!vao) continue;

      gl.bindVertexArray(vao.vao);
      gl.drawElements(gl.TRIANGLES, vao.indexCount, gl.UNSIGNED_SHORT, 0);
      gl.bindVertexArray(null);

    }
  }
}