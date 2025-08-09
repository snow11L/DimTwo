
import { ResourcesManager } from "../../global/manager/manager";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WebGL = canvas.getContext('webgl2');
if (!WebGL) throw new Error("WebGL not supported");




export const Global = {
    ResourcesManager,
    WebGL
}   