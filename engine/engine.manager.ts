import { SYSTEM_STATE } from "../core/gears/ecs/system";
import { MANAGER } from "../core/managers/entity_manager";
import { COMPONENT_STATE } from "./types";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl2');
if (!gl) throw new Error("WebGL not supported");

const debug = document.querySelector("#debug") as HTMLSpanElement;
if (!debug) throw new Error("debug not supported");

export const ENGINE = {
    DEFAULT_COMPONENT_STATE: COMPONENT_STATE,
    DEFAULT_SYSTEM_STATE: SYSTEM_STATE,
    MANAGER,
    WEB_GL: gl
}   