
import { ResourcesManager } from "../../global/manager/manager";
import Time from "../time/time";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WebGL = canvas.getContext('webgl2');
if (!WebGL) throw new Error("WebGL not supported");

const debug = document.querySelector("#debug") as HTMLSpanElement;
if (!debug) throw new Error("debug not supported");

export const Engine = new Time();

export const Global = {
    Engine,
    ResourcesManager,
    WebGL
}   