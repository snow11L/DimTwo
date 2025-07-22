import type { Material } from "../resources/material/material";
import type { Mesh } from "../resources/mesh/mesh";
import type { Shader } from "../resources/shader";
import type { ShaderSystem } from "../resources/shader/ShaderSystem";
import type { Sprite } from "../resources/sprite";
import type { Texture } from "../webgl/texture";
import type { FontData } from "./FontManager";
import { createGenericManager } from "./generic_manager";

const MATERIAL = createGenericManager<string, Material>("material_manager");
const MESH = createGenericManager<number, Mesh>("mesh_manager");
const SHADER = createGenericManager<string, Shader>("shader_manager");
const SHADER_SYSTEM = createGenericManager<string, ShaderSystem>("shader_system_manager");
const TEXTURE = createGenericManager<string, Texture>("texture_manager");
const SPRITE = createGenericManager<string, Sprite>("sprite_manager");
const FONT = createGenericManager<string, FontData>("font_manager");

export const ResourcesManager = {
    FONT,
    MATERIAL,
    MESH,
    SHADER,
    TEXTURE,
    SPRITE,
    SHADER_SYSTEM,
};