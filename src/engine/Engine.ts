import { Global } from "./core/managers/engine.manager";
import { GenericManager } from "./core/managers/generic_manager";
import type { Mat4 } from "./core/math/mat4/Mat4";
import type { Scene } from "./core/scene/scene";
import { SceneManager } from "./core/scene/SceneManager";
import Time from "./core/time/time";
import type { MeshBuffer } from "./interfaces/IMeshBuffer";
import { ComponentType } from "./modules/components/component-type";
import { Camera } from "./modules/components/render/camera/Camera";

export class Engine {

    public readonly time: Time;
    private scene: Scene | null = null;
    camera: Camera | null = null;

    public readonly mat4: GenericManager<number, Mat4> = new GenericManager("Engine Mat4 Manager");
    public readonly vao: GenericManager<number, MeshBuffer> = new GenericManager("Engine VAO Manager");

    constructor(WebGL: WebGL2RenderingContext) {
        this.time = new Time();
        this.time.on("start", () => {
            this.scene?.systems.callStart();
        });

        this.time.on("fixedUpdate", () => {
            this.scene?.systems.callFixedUpdate();
        });

        this.time.on("update", () => {
            this.scene?.systems.callUpdate();
            this.scene?.systems.callLateUpdate();
        });


        this.time.on("render", () => {
            if (!this.scene) return;

            const cameras = this.scene.components.getAllOfType<Camera>(ComponentType.Camera);
            for (const c of cameras) {

                if (c.enabled) {
                    this.camera = c;
                    break;
                }
            }

            if (!this.camera) return;

            const color = this.camera.clearColor;

            const WebGL = Global.WebGL;
            WebGL.clearColor(color.r, color.g, color.b, color.a);
            WebGL.clear(WebGL.COLOR_BUFFER_BIT);
            this.scene?.systems.callRender();
            this.scene?.systems.callDrawGizmos();
        });
    }

    loadScene(name: string) {
        const scene = SceneManager.getScene(name);
        if (!scene) {
            throw new Error(`Scene "${name}" not found`);
        }

        scene.setEngine(this);
        scene.load();
        this.scene = scene;
        scene.systems.callStart();
    }
}