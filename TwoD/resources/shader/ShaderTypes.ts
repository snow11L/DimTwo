import { ENGINE } from "../../managers/engine.manager";
import { WebGL } from "../../webgl/WebGL";

export interface Shader {
  name: string;
  program: WebGLProgram;
  vertexSource: string;
  fragmentSource: string;
  attributes: Map<string, GLint>;
  uniforms: Map<string, WebGLUniformLocation>;
}

export function createShader(
  name: string,
  vertexSource: string,
  fragmentSource: string
): Shader {

  const gl = ENGINE.WEB_GL;
  const vertexShader = WebGL.compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = WebGL.compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  const program = WebGL.createProgram(gl, vertexShader, fragmentShader);

  const attributes = WebGL.getAttributes(gl, program);
  const uniforms = WebGL.getUniforms(gl, program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return {
    name,
    program,
    vertexSource,
    fragmentSource,
    attributes,
    uniforms,
  };
}