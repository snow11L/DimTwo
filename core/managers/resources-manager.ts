import { ENGINE } from "../../engine/engine.manager";
import { createShader } from "../webgl/shader";
import { createTexture } from "../webgl/texture";
import { generic_manager_add } from "./generic_manager";
import type { ShaderFile } from "./shaderLoader";


export interface Resource {
  name: string;
  path: string;
}
export type ImageFile = Resource;
export type TextFile = Resource;

export class ResourceManager {
  public images = new Map<string, HTMLImageElement>();
  private textFiles = new Map<string, string>();



  async load_images_and_create_textures(assets: ImageFile) {

    const gl = ENGINE.WEB_GL;

    const promises = Object.entries(assets).map(async ([name, path]) => {
      try {
        const img = await this.loadImage(path.path);

        const imageBitmap = await createImageBitmap(img, {
          imageOrientation: "flipY"
        });

        const texture = createTexture(gl, imageBitmap);
        generic_manager_add(ENGINE.MANAGER.TEXTURE, name, texture);

        this.images.set(path.path, img);

      } catch (error) {
        console.error(`Failed to load or process image: ${path.path}`, error);
        throw error;
      }
    });

    await Promise.all(promises);
  }

  async load_shaders_and_compile(shaders: ShaderFile) {

    for (const [shaderName, paths] of Object.entries(shaders)) {
      const vertResponse = await fetch(paths.vert);
      const fragResponse = await fetch(paths.frag);

      const vert = await vertResponse.text();
      const frag = await fragResponse.text();

      const shader = createShader(shaderName, vert, frag);
      generic_manager_add(ENGINE.MANAGER.SHADER, shaderName, shader);
    }
  }


  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }
  clear(): void {
    this.images.clear();
    this.textFiles.clear();
  }
}



export const resourceManager = new ResourceManager();






