import { ENGINE } from "../../../engine/engine.manager";
import { GL_FUNCTIONS } from "../gl";

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
  const vertexShader = GL_FUNCTIONS.compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = GL_FUNCTIONS.compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  const program = GL_FUNCTIONS.createProgram(gl, vertexShader, fragmentShader);

  const attributes = GL_FUNCTIONS.getAttributes(gl, program);
  const uniforms = GL_FUNCTIONS.getUniforms(gl, program);

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