import { ENGINE } from "../../engine/engine.manager";
import { createShader } from "../webgl/shader";
import { createTexture } from "../webgl/texture";
import { generic_manager_add } from "./generic_manager";
import { Result } from "./result";
import type { ShaderFile, TextureFile } from "./shaderLoader";
import { TEXTURE_MANAGER } from "./texture_manager";


export interface Resource {
  name: string;
  path: string;
}
export type ImageFile = Resource;
export type TextFile = Resource;

export class ResourceManager {
  public images = new Map<string, HTMLImageElement>();
  private textFiles = new Map<string, string>();



  async load_images_and_create_textures(assets: TextureFile) {

    const gl = ENGINE.WEB_GL;

    const promises = Object.entries(assets).map(async ([name, path]) => {
      try {
        const img = await this.loadImage(path.path);

        const imageBitmap = await createImageBitmap(img, {
          imageOrientation: "flipY"
        });

        const texture = createTexture(gl, imageBitmap);
        generic_manager_add(TEXTURE_MANAGER, name, texture);

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










  async loadImageFiles(assets: ImageFile[]): Promise<void> {
    const promises = assets.map((asset) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.images.set(asset.name, img);
          resolve();
        };
        img.onerror = () => reject(new Error(`Failed to load image: ${asset.path}`));
        img.src = asset.path;
      });
    });
    await Promise.all(promises);
  }

  async loadTextFiles(assets: TextFile[]): Promise<void> {
    const promises = assets.map(async (asset) => {
      try {
        const response = await fetch(asset.path);
        if (!response.ok) {
          throw new Error(`Failed to load text file: ${asset.path}`);
        }
        const text = await response.text();
        this.textFiles.set(asset.name, text);
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
    await Promise.all(promises);
  }

  getImageSafe(name: string): Result<HTMLImageElement> {
    const img = this.images.get(name);
    if (!img) {
      return Result.err(`Texture "${name}" not found.`);
    }
    return Result.ok(img);
  }

  getTextFileSafe(name: string): Result<string> {
    const text = this.textFiles.get(name);
    if (!text) {
      return Result.err(`Text file "${name}" not found.`);
    }
    return Result.ok(text);
  }

  clear(): void {
    this.images.clear();
    this.textFiles.clear();
  }
}



export const resourceManager = new ResourceManager();






