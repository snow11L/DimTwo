import type { Sprite } from "../gears/sprite";
import type { GameEntity } from "../types/EngineEntity";
import type { Mat4 } from "../webgl/mat4";
import type { Material } from "../webgl/material/material";
import type { Mesh } from "../webgl/mesh";
import type { GLVAO } from "../webgl/mesh_gl";
import type { Shader } from "../webgl/shader";
import type { ShaderSystem } from "../webgl/system/shader_system";
import type { Texture } from "../webgl/texture";
import type { FontData } from "./FontManager";
import { createGenericManager } from "./generic_manager";

const GAME_ENTITY_BY_ID = createGenericManager<number, GameEntity>("game_entity_by_id_manager");
const GAME_ENTITY_BY_NAME = createGenericManager<string, GameEntity>("game_entity_by_name_manager");

const MATERIAL = createGenericManager<string, Material>("material_manager");
const MAT4 = createGenericManager<number, Mat4>("mat4_manager");
const MESH = createGenericManager<string, Mesh>("mesh_manager");
const SHADER = createGenericManager<string, Shader>("shader_manager");
const SHADER_SYSTEM = createGenericManager<string, ShaderSystem>("shader_system_manager");
const TEXTURE = createGenericManager<string, Texture>("texture_manager");
const VAO = createGenericManager<string, GLVAO>("vao_manager");
const SPRITE = createGenericManager<string, Sprite>("sprite_manager");
const FONT = createGenericManager<string, FontData>("font_manager");

export const MANAGER = {
    FONT,
    MATERIAL,
    GAME_ENTITY_BY_ID,
    GAME_ENTITY_BY_NAME,
    MAT4,
    MESH,
    SHADER,
    TEXTURE,
    SPRITE,
    SHADER_SYSTEM,
    VAO
};
