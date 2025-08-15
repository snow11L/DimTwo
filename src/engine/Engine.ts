import type { Editor } from "../main";
import { Display } from "./core/display/Display";
import { EngineSystem, EngineSystemManager } from "./core/managers/EngineSystemManager";
import { SimpleManager } from "./core/managers/SimpleManager";
import { SystemManager } from "./core/managers/SystemManager";
import type { Mat4 } from "./core/math/Mat4";
import type { Scene } from "./core/scene/scene";
import { SceneManager } from "./core/scene/SceneManager";
import Time from "./core/time/Time";
import type { MeshBuffer, TextureBuffer } from "./interfaces/IMeshBuffer";
import type { Mesh } from "./modules/resources/mesh/Mesh";
import { Shader } from "./modules/resources/shader/Shader";
import { Texture } from "./modules/resources/texture/types";

export class Engine {
    public display: Display;

    public getElement() {
        return this.display.getCanvas();
    }

    public getContext() {
        return this.display.getContext();
    }

    public readonly time: Time;
    protected scene: Scene | null = null;

    public shaders: SimpleManager<Shader> = new SimpleManager("Shader Manager");
    public matrices: SimpleManager<Mat4> = new SimpleManager("Matrix Manager");
    public meshBuffers: SimpleManager<MeshBuffer> = new SimpleManager("Mesh Buffer Manager");
    public textureBuffers: SimpleManager<TextureBuffer> = new SimpleManager("Texture Buffer Manager");
    public systems: SystemManager = new SystemManager();


    public usedSystems: EngineSystem[] = [];

    public useSystem(systemType: EngineSystem) {
        this.usedSystems.push(systemType);
    }

    constructor() {

        this.display = new Display();

        this.time = new Time();
        this.time.on("start", () => {
            this.systems.callStart();
        });

        this.time.on("fixedUpdate", () => {
            this.systems.callFixedUpdate(this.time.fixedDeltaTime);
        });

        this.time.on("update", () => {
            this.systems.callUpdate(this.time.deltaTime);
            this.systems.callLateUpdate(this.time.deltaTime);
        });


        const context = this.display.getContext();

        this.time.on("render", () => {
            if (!this.scene) return;
            const camera = this.scene.getActiveCamera();
            if (!camera) return;
            const color = camera.clearColor;

            context.clearColor(color.r, color.g, color.b, color.a);
            context.clear(context.COLOR_BUFFER_BIT);

            this.systems.callRender(this.time.deltaTime);
            this.systems.callDrawGizmos();
        });
    }



    loadScene(name: string, clone: boolean = false) {
        const scene = SceneManager.getScene(name);
        if (!scene) {
            throw new Error(`Scene "${name}" not found`);
        }

        const s = scene; // ou scene.clone() se clone for true

        for (const system of this.usedSystems) {
            let systemInstance = this.systems.getSystem(system);
            if (systemInstance) {
                systemInstance.setScene(s);
                continue;
            }

            systemInstance = EngineSystemManager.create(system);
            if (!systemInstance) {
                throw new Error(`System ${EngineSystem[system]} could not be created`);
            }

            systemInstance.setScene(s);
            systemInstance.setEngine(this);
            this.systems.addSystem(system, systemInstance);
        }

        this.scene = s;
        this.systems.callStart();
        this.onLoadSceneCallback?.(s);
    }

    setScene(scene: Scene) {
        this.scene = scene;
    }

    getScene() {
        return this.scene;
    }

    public compileShader(name: string, vertSource: string, fragSource: string) {
        const shader = new Shader(this.getContext(), name, vertSource, fragSource);
        this.shaders.add(name, shader);
    }

    public compileTexture(texture: Texture) {
        const textureBuffer = texture.compile(this.getContext());
        this.textureBuffers.add(texture.name, textureBuffer);
    }

    public compileMesh(mesh: Mesh) {
        const meshBuffer = mesh.compile(this.getContext());
        this.meshBuffers.add(mesh.name, meshBuffer);
    }

    protected onFocusCallback?: (editor: Editor) => void;
    protected onLoadSceneCallback?: (scene: Scene) => void;

    public onLoadScene(callback: (scene: Scene) => void) {
        this.onLoadSceneCallback = callback;
    }

    public onFocusWindow(callback: (editor: Editor) => void) {
        this.onFocusCallback = callback;
    }
}
