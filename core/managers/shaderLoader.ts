import { ENGINE } from "../../engine/engine.manager";
import { createShader } from "../webgl/shader";
import { generic_manager_add } from "./generic_manager";

export interface ShaderFileEntry {
    vert: string;
    frag: string;
}

export interface TextureFileEntry {
    path: string;
}

export interface TextureFile {
    [key: string]: TextureFileEntry;
}

export interface ShaderFile {
    [key: string]: ShaderFileEntry;
}

export class ShaderLoader {
    static async load_and_create_shaders(shaders: ShaderFile) {
      
        for (const [shaderName, paths] of Object.entries(shaders)) {
            const vertResponse = await fetch(paths.vert);
            const fragResponse = await fetch(paths.frag);

            const vert = await vertResponse.text();
            const frag = await fragResponse.text();

            const shader = createShader(shaderName, vert, frag);
            generic_manager_add(ENGINE.MANAGER.SHADER, shaderName, shader);
        }
    }
}