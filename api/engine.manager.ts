import { ResourcesManager } from "../core/managers/manager";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl2');
if (!gl) throw new Error("WebGL not supported");

const debug = document.querySelector("#debug") as HTMLSpanElement;
if (!debug) throw new Error("debug not supported");

export const ENGINE = {
    MANAGER: ResourcesManager,
    WEB_GL: gl
}   