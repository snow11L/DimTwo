import type { Mat4 } from "./core/math/mat4/Mat4";
import type { Scene } from "./core/scene/scene";
import { SceneManager } from "./core/scene/SceneManager";
import Time from "./core/time/time";
import type { MeshBuffer } from "./interfaces/IMeshBuffer";
import { ComponentType } from "./modules/components/component-type";
import { Camera } from "./modules/components/render/camera/Camera";
import type { Mesh } from "./modules/resources/mesh/Mesh";
import { Shader } from "./modules/resources/shader/Shader";
import { Texture } from "./modules/resources/texture/types";

export class SimpleManager<T> {

    private readonly managerName: string;
    private readonly data: Map<string, T> = new Map();

    constructor(name: string) {
        this.managerName = name;
    }

    public add(name: string, resource: T): T {
        if (this.data.has(name)) {
            console.warn(`[${this.managerName}] Recurso "${name}" já está registrado.`);
            return this.data.get(name)!;
        }
        this.data.set(name, resource);
        return resource;
    }

    public get(name: string): T | undefined {
        const resource = this.data.get(name);
        if (!resource) {
            console.warn(`[${this.managerName}] Recurso "${name}" não encontrado.`);
        }
        return resource;
    }

    public remove(name: string) {
        if (!this.data.has(name)) {
            console.warn(`[${this.managerName}] Tentativa de remover recurso "${name}" que não existe.`);
            return;
        }
        this.data.delete(name);
    }

    public clear() {
        this.data.clear();
    }
}

export class Engine {

    public readonly time: Time;
    private scene: Scene | null = null;
    camera: Camera | null = null;

    public shaders: SimpleManager<Shader> = new SimpleManager("Shader Manager");
    public textures: SimpleManager<Texture> = new SimpleManager("Texture Manager");
    public matrices: SimpleManager<Mat4> = new SimpleManager("Matrix Manager");
    public buffers: SimpleManager<MeshBuffer> = new SimpleManager("Buffer Manager");

    private gl: WebGL2RenderingContext;

    constructor(WebGL: WebGL2RenderingContext) {

        this.gl = WebGL;

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

    public compileShader(name: string, vertSource: string, fragSource: string){
        const shader = new Shader(this.gl, name, vertSource, fragSource);
        this.shaders.add(name, shader);
    }

    public compileTexture(texture: Texture) {
        texture.compile(this.gl);
        this.textures.add(texture.name, texture);
    }

    public compileMesh(mesh: Mesh) {
        const meshBuffer = mesh.compile(this.gl);
        this.buffers.add(mesh.name, meshBuffer);
    }
}