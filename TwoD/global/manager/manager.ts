import type { MaterialType, MeshType, ShaderType, SpriteType, TextureType } from "../../core";
import type { FontData } from "../../core/managers/FontManager";
import { GenericManager } from "../../core/managers/generic_manager";
import type { ShaderSystem } from "../../core/resources/shader/ShaderSystem";

export const MaterialManager = new GenericManager<string, MaterialType>("material_manager");
export const MeshManager = new GenericManager<number, MeshType>("mesh_manager");
export const ShaderManager = new GenericManager<string, ShaderType>("shader_manager");
export const ShaderSystemManager = new GenericManager<string, ShaderSystem>("shader_system_manager");
export const TextureManager = new GenericManager<string, TextureType>("texture_manager");
export const SpriteManager = new GenericManager<string, SpriteType>("sprite_manager");
export const FontManager = new GenericManager<string, FontData>("font_manager");

export const ResourcesManager = {
    FontManager: FontManager,
    MaterialManager: MaterialManager,
    MeshManager: MeshManager,
    ShaderManager: ShaderManager,
    TextureManager: TextureManager,
    SpriteManager: SpriteManager,
    ShaderSystemManager: ShaderSystemManager,
};