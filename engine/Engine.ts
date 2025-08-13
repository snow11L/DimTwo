import { Global } from "./core/managers/engine.manager";
import { SceneManager } from "./core/scene/SceneManager";
import Time from "./core/time/time";
import { Camera } from "./modules/components/render/camera/Camera";

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
            const camera = Camera.getActivedCamera();
            const color = camera?.clearColor;

            const WebGL = Global.WebGL;
            WebGL.clearColor(color.r, color.g, color.b, color.a);
            WebGL.clear(WebGL.COLOR_BUFFER_BIT);
            scene.ECSSystems.callRender();
            scene.ECSSystems.callDrawGizmos();
        });
    }
}