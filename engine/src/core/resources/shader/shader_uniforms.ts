import { Global } from "../../managers/engine.manager";
import type { TextureType } from "../texture/types";
import type { ShaderType } from "./types";

function warnIfUniformNotFound(shader: ShaderType, type: string, name: string) {
  console.warn(`Uniform:${type} '${name}' not found in shader program '${shader.name}'.`);
}

export function shader_get_uniform(shader: ShaderType, name: string): WebGLUniformLocation | null {
  return shader.uniforms.get(name) ?? null;
}

export function shader_set_uniform_mat4(shader: ShaderType, name: string, matrix: Float32Array) {
  const gl = Global.WebGL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "mat4", name);
    return;
  }
  gl.uniformMatrix4fv(location, false, matrix);
}

export function shader_set_uniform_4f(shader: ShaderType, name: string, x: number, y: number, z: number, w: number) {
  const gl = Global.WebGL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "4f", name);
    return;
  }
  gl.uniform4f(location, x, y, z, w);
}

export function shader_set_uniform_3f(shader: ShaderType, name: string, x: number, y: number, z: number) {
  const gl = Global.WebGL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "3f", name);
    return;
  }
  gl.uniform3f(location, x, y, z);
}

export function shader_set_uniform_2f(shader: ShaderType, name: string, x: number, y: number) {
  const gl = Global.WebGL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "2f", name);
    return;
  }
  gl.uniform2f(location, x, y);
}

export function shader_set_uniform_1f(shader: ShaderType, name: string, x: number) {
  const gl = Global.WebGL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "1f", name);
    return;
  }
  gl.uniform1f(location, x);
}

export function shader_set_uniform_1i(shader: ShaderType, name: string, x: number) {
  const gl = Global.WebGL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "1i", name);
    return;
  }
  gl.uniform1i(location, x);
}

export function shader_set_uniform_texture(
  shader: ShaderType,
  name: string,
  texture: TextureType,
  unit: number = 0
) {
  const gl = Global.WebGL;
  const glTexture = texture.texture;
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, glTexture);

  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "texture", name);
    return;
  }
  gl.uniform1i(location, unit);
}