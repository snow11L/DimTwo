import type { MaterialType, MeshType, ShaderType, SpriteType, TextureType } from "../../core";
import type { FontData } from "../../core/managers/FontManager";
import { createGenericManager } from "../../core/managers/generic_manager";
import type { ShaderSystem } from "../../core/resources/shader/ShaderSystem";

export const MaterialManager = createGenericManager<string, MaterialType>("material_manager");
export const MeshManager = createGenericManager<number, MeshType>("mesh_manager");
export const ShaderManager = createGenericManager<string, ShaderType>("shader_manager");
export const ShaderSystemManager = createGenericManager<string, ShaderSystem>("shader_system_manager");
export const TextureManager = createGenericManager<string, TextureType>("texture_manager");
export const SpriteManager = createGenericManager<string, SpriteType>("sprite_manager");
export const FontManager = createGenericManager<string, FontData>("font_manager");

export const ResourcesManager = {
    FontManager: FontManager,
    MaterialManager: MaterialManager,
    MeshManager: MeshManager,
    ShaderManager: ShaderManager,
    TextureManager: TextureManager,
    SpriteManager: SpriteManager,
    ShaderSystemManager: ShaderSystemManager,
};