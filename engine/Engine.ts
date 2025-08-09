import { Global } from "./core/managers/engine.manager";
import { SceneManager } from "./core/scene/SceneManager";
import Time from "./core/time/time";

export class Engine {
    
    public readonly time: Time;

    constructor(WebGL: WebGL2RenderingContext) {
        this.time = new Time();
        this.time.on("start", () => {
            const scene = SceneManager.getCurrentScene();
            scene.ECSSystems.callStart();
        });

        this.time.on("fixedUpdate", () => {
            const scene = SceneManager.getCurrentScene();
            scene.ECSSystems.callFixedUpdate();
        });

        this.time.on("update", () => {
            const scene = SceneManager.getCurrentScene();
            scene.ECSSystems.callUpdate();
            scene.ECSSystems.callLateUpdate();
        });

        this.time.on("render", () => {
            const scene = SceneManager.getCurrentScene();
            const WebGL = Global.WebGL;
            WebGL.clearColor(0, 0, 0, 1);
            WebGL.clear(WebGL.COLOR_BUFFER_BIT);
            scene.ECSSystems.callRender();
            scene.ECSSystems.callDrawGizmos();
        });
    }
}