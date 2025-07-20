import { ComponentType } from "../../../types/component-type";
import type { SpriteRenderComponent } from "./sprite.render.types";
import type { System } from "../../ecs/system";
import { ECS } from "../../../../engine/TwoD";
import type { TransformComponent } from "../../transform";
import { generic_manager_get } from "../../../managers/generic_manager";
import { VAO_MANAGER } from "../../../managers/vao_manager";
import { SHADER_SYSTEM_MANAGER } from "../../../managers/shader_system_manager";
import { material_get } from "../../../builders/create.material";
import { ENGINE } from "../../../../engine/engine.manager";

export function SpriteRenderSystem(): System {
  
  const webGL = ENGINE.WEB_GL;
  const state = ENGINE.DEFAULT_COMPONENT_STATE;

  return {
    render() {
      webGL.enable(webGL.BLEND);
      webGL.blendFunc(webGL.SRC_ALPHA, webGL.ONE_MINUS_SRC_ALPHA);

      let spriteRenderers = ECS.Component.getComponentsByType<SpriteRenderComponent>(
        state,
        ComponentType.SPRITE_RENDER
      );

      spriteRenderers = spriteRenderers.sort((a, b) => a.layer - b.layer);
   
      for (const spriteRender of spriteRenderers) {
        if (!spriteRender.enabled) continue;

        const material = material_get(spriteRender.materialName);
        if (!material) continue;

        const shader = generic_manager_get(ENGINE.MANAGER.SHADER, material.shaderName)!;
        webGL.useProgram(shader.program);

        const transform = ECS.Component.getComponent<TransformComponent>(
          state,
          spriteRender.gameEntity,
          ComponentType.TRANSFORM
        );

        if (!transform) continue;

        const shaderSystem = generic_manager_get(SHADER_SYSTEM_MANAGER, material.name);
        if (!shaderSystem) continue;
        shaderSystem.global?.();

        shaderSystem.local?.(spriteRender.gameEntity);

        const mesh = generic_manager_get(ENGINE.MANAGER.MESH, spriteRender.meshName);
        if (!mesh) continue;

        const vao = generic_manager_get(VAO_MANAGER, mesh.name);
        if (!vao) continue;

        webGL.bindVertexArray(vao.vao);
        webGL.drawElements(webGL.TRIANGLES, vao.indexCount, webGL.UNSIGNED_SHORT, 0);
        webGL.bindVertexArray(null);
      }
    },
  };
}