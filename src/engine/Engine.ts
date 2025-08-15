import { EngineSystem, EngineSystemManager } from "./core/managers/EngineSystemManager";
import { SimpleManager } from "./core/managers/SimpleManager";
import { SystemManager } from "./core/managers/SystemManager";
import type { Mat4 } from "./core/math/Mat4";
import type { Scene } from "./core/scene/scene";
import { SceneManager } from "./core/scene/SceneManager";
import Time from "./core/time/Time";
import type { MeshBuffer, TextureBuffer } from "./interfaces/IMeshBuffer";
import { Camera } from "./modules/components/render/Camera";
import { ComponentType } from "./modules/enums/ComponentType";
import type { Mesh } from "./modules/resources/mesh/Mesh";
import { Shader } from "./modules/resources/shader/Shader";
import { Texture } from "./modules/resources/texture/types";


export class Engine {
    public getElement() {
        return this.gl.canvas;
    }
    public readonly time: Time;
    private scene: Scene | null = null;
    camera: Camera | null = null;

    public shaders: SimpleManager<Shader> = new SimpleManager("Shader Manager");
    public matrices: SimpleManager<Mat4> = new SimpleManager("Matrix Manager");
    public meshBuffers: SimpleManager<MeshBuffer> = new SimpleManager("Mesh Buffer Manager");
    public textureBuffers: SimpleManager<TextureBuffer> = new SimpleManager("Texture Buffer Manager");
    public systems: SystemManager = new SystemManager();
    private gl: WebGL2RenderingContext;
    public usedSystems: EngineSystem[] = [];
    public useSystem(systemType: EngineSystem) {
        this.usedSystems.push(systemType);
    }

    constructor() {

        const canvas = document.createElement("canvas");
        canvas.className = "engine-canvas";
        const WebGL = canvas.getContext('webgl2');
        if (!WebGL) throw new Error("WebGL not supported");
        this.gl = WebGL;

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
            this.camera.aspect = canvas.width / canvas.height;
            WebGL.viewport(0, 0, canvas.width, canvas.height)
            WebGL.clearColor(color.r, color.g, color.b, color.a);
            WebGL.clear(WebGL.COLOR_BUFFER_BIT);
            this.systems.callRender(this.time.deltaTime);
            this.systems.callDrawGizmos();
        });
    }

    loadScene(name: string, clone: boolean = false) {
        const scene = SceneManager.getScene(name);
        if (!scene) {
            throw new Error(`Scene "${name}" not found`);
        }

        const s =  scene;

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
    }

    setScene(scene: Scene) {
        this.scene = scene;
    }

   getScene() {
        return this.scene;
    }



    public compileShader(name: string, vertSource: string, fragSource: string) {
        const shader = new Shader(this.gl, name, vertSource, fragSource);
        this.shaders.add(name, shader);
    }

    public compileTexture(texture: Texture) {
        const textureBuffer = texture.compile(this.gl);
        this.textureBuffers.add(texture.name, textureBuffer);
    }

    public compileMesh(mesh: Mesh) {
        const meshBuffer = mesh.compile(this.gl);
        this.meshBuffers.add(mesh.name, meshBuffer);
    }
}
