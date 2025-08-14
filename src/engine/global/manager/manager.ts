
import type { MaterialType, MeshType, SpriteType, TextureType } from "../../core";
import { GenericManager } from "../../core/managers/generic_manager";
import type { Shader } from "../../modules/resources/shader/Shader";
import type { ShaderSystem } from "../../modules/resources/shader/ShaderSystem";

export class ResourcesManager {
    public static readonly MaterialManager = new GenericManager<string, MaterialType>("material_manager");
    public static readonly MeshManager = new GenericManager<number, MeshType>("mesh_manager");
    public static readonly ShaderManager = new GenericManager<string, Shader>("shader_manager");
    public static readonly ShaderSystemManager = new GenericManager<string, ShaderSystem>("shader_system_manager");
    public static readonly TextureManager = new GenericManager<string, TextureType>("texture_manager");
    public static readonly SpriteManager = new GenericManager<string, SpriteType>("sprite_manager");

    public static clearAll() {
        this.MaterialManager.values.clear();
        this.MeshManager.values.clear();
        this.ShaderManager.values.clear();
        this.ShaderSystemManager.values.clear();
        this.TextureManager.values.clear();
        this.SpriteManager.values.clear();
    }
}
