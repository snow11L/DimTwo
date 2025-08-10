import { ResourcesManager } from "../global/manager/manager";
import { Shader } from "./resources/shader/Shader";

export interface ShaderFileEntry {
    vert: string;
    frag: string;
}

export interface TextureFileEntry {
    path: string;
}

export interface ImageFile {
    [key: string]: TextureFileEntry;
}


export interface FontFileEntry {
    csv: string;
    image: string;
}

export interface FontFile {
    [key: string]: FontFileEntry;
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

            const shader = new Shader(shaderName, vert, frag);
            ResourcesManager.ShaderManager.add(shaderName, shader);
        }
    }
}