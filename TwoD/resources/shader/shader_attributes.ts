import type { ShaderType } from "./types";

export function shader_get_attribute(shader: ShaderType, name: string): GLint | null {
  return shader.attributes.get(name) ?? null;
}