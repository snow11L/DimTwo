import { Global } from "../managers/engine.manager";
import { Scene } from "../resources/scene/scene";
import Time from "../time/time";

export class Engine {

    public readonly time: Time;

    constructor() {
        this.time = new Time();
        this.time.on("start", () => {

            const scene = Scene.getCurrentScene();
            scene.ECSSystems.callStart();
        });

        this.time.on("fixedUpdate", () => {
            const scene = Scene.getCurrentScene();
            scene.ECSSystems.callFixedUpdate();

        });

        this.time.on("update", () => {
            const scene = Scene.getCurrentScene();
            scene.ECSSystems.callUpdate();
            scene.ECSSystems.callLateUpdate();
        });

        this.time.on("render", () => {
            const scene = Scene.getCurrentScene();
            const WebGL = Global.WebGL;
            WebGL.clearColor(0, 0, 0, 1);
            WebGL.clear(WebGL.COLOR_BUFFER_BIT);
            scene.ECSSystems.callRender();
            scene.ECSSystems.callDrawGizmos();
        });
    }
}