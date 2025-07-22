import { ENGINE } from "../../managers/engine.manager";
import type { Texture } from "../../webgl/texture";
import type { Shader } from "./ShaderTypes";

function warnIfUniformNotFound(shader: Shader, type: string, name: string) {
  console.warn(`Uniform:${type} '${name}' not found in shader program '${shader.name}'.`);
}

export function shader_get_uniform(shader: Shader, name: string): WebGLUniformLocation | null {
  return shader.uniforms.get(name) ?? null;
}

export function shader_set_uniform_mat4(shader: Shader, name: string, matrix: Float32Array) {
  const gl = ENGINE.WEB_GL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "mat4", name);
    return;
  }
  gl.uniformMatrix4fv(location, false, matrix);
}

export function shader_set_uniform_4f(shader: Shader, name: string, x: number, y: number, z: number, w: number) {
  const gl = ENGINE.WEB_GL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "4f", name);
    return;
  }
  gl.uniform4f(location, x, y, z, w);
}

export function shader_set_uniform_3f(shader: Shader, name: string, x: number, y: number, z: number) {
  const gl = ENGINE.WEB_GL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "3f", name);
    return;
  }
  gl.uniform3f(location, x, y, z);
}

export function shader_set_uniform_2f(shader: Shader, name: string, x: number, y: number) {
  const gl = ENGINE.WEB_GL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "2f", name);
    return;
  }
  gl.uniform2f(location, x, y);
}

export function shader_set_uniform_1f(shader: Shader, name: string, x: number) {
  const gl = ENGINE.WEB_GL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "1f", name);
    return;
  }
  gl.uniform1f(location, x);
}

export function shader_set_uniform_1i(shader: Shader, name: string, x: number) {
  const gl = ENGINE.WEB_GL;
  const location = shader_get_uniform(shader, name);
  if (!location) {
    warnIfUniformNotFound(shader, "1i", name);
    return;
  }
  gl.uniform1i(location, x);
}

export function shader_set_uniform_texture(
  shader: Shader,
  name: string,
  texture: Texture,
  unit: number = 0
) {
  const gl = ENGINE.WEB_GL;
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