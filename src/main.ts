import { GameEntity } from "./engine/core/base/GameEntity";
import { EngineSystem, EngineSystemManager } from "./engine/core/managers/SystemManager";
import { Scene } from "./engine/core/scene/scene";
import { SceneManager } from "./engine/core/scene/SceneManager";
import { Engine } from "./engine/Engine";
import { ResourcesManager } from "./engine/global/manager/manager";
import type { MaterialType } from "./engine/modules/resources";
import { AdvancedShaderSystem } from "./engine/modules/resources/material/AdvancedShaderSystem";
import { AnimatorSystem, PhysicsSystem, RenderSystem } from "./engine/modules/systems";
import { createCamera as configureCamera } from "./game/entities/camera.entity";
import { createPlayer as configurePlayer } from "./game/entities/player.entity";
import { createSlime as configureSlime } from "./game/entities/slime.entity";
import { CharacterControlerSystem } from "./game/systems/character-controller/character-controller-system";
import { InputSystem } from "./game/systems/character-controller/InputSystem";


function getWebGL() {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const WebGL = canvas.getContext('webgl2');
    if (!WebGL) throw new Error("WebGL not supported");
    return WebGL;
}



async function LoadResources() {

    const advanced_material: MaterialType = {
        name: "advanced_material",
        shaderName: "advanced",
    };

    ResourcesManager.MaterialManager.add(advanced_material.name, advanced_material);


    const advancedShader = new AdvancedShaderSystem();
    ResourcesManager.ShaderSystemManager.add(advanced_material.name, advancedShader);
}



interface LoadableResource<T> {
    load(): Promise<T>;
}

class TextFileLoader implements LoadableResource<string> {
    constructor(private path: string) { }

    async load(): Promise<string> {
        const response = await fetch(this.path);
        return await response.text();
    }
}

class ImageFileLoader implements LoadableResource<HTMLImageElement> {
    constructor(private path: string) { }

    async load(): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = this.path;
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image at ${this.path}`));
        });
    }
}


class EngineResource {
    private static resources: Map<string, any> = new Map();
    private static registry: Map<string, LoadableResource<any>> = new Map();

    public static register<T>(name: string, loader: LoadableResource<T>) {
        this.registry.set(name, loader);
    }

    public static async load() {
        for (const [name, loader] of this.registry.entries()) {
            const loaded = await loader.load();
            this.resources.set(name, loaded);
        }
    }

    public static get<T>(name: string): T | undefined {
        return this.resources.get(name) as T | undefined;
    }
}



await LoadResources();








const engine = new Engine(getWebGL());

EngineResource.register("simpleShaderVertex", new TextFileLoader("./src/engine/assets/shaders/simpleShader.vert"));
EngineResource.register("simpleShaderFragment", new TextFileLoader("./src/engine/assets/shaders/simpleShader.frag"));

EngineResource.register("advancedShaderVertex", new TextFileLoader("./src/engine/assets/shaders/advancedShader.vert"));
EngineResource.register("advancedShaderFragment", new TextFileLoader("./src/engine/assets/shaders/advancedShader.frag"));

EngineResource.register("player", new ImageFileLoader("./src/game/assets/images/Player.png"));
EngineResource.register("slime", new ImageFileLoader("./src/game/assets/images/Slime.png"));

await EngineResource.load();

engine.loadShader("advanced",
    EngineResource.get("advancedShaderVertex")!,
    EngineResource.get("advancedShaderFragment")!
);

engine.loadTexture("player", EngineResource.get("player")!)
engine.loadTexture("slime", EngineResource.get("slime")!)

EngineSystemManager.register(EngineSystem.RenderSystem, () => new RenderSystem());
EngineSystemManager.register(EngineSystem.AnimatorSystem, () => new AnimatorSystem());
EngineSystemManager.register(EngineSystem.InputSystem, () => new InputSystem());
EngineSystemManager.register(EngineSystem.PhysicsSystem, () => new PhysicsSystem());
EngineSystemManager.register(EngineSystem.CharacterControlerSystem, () => new CharacterControlerSystem());

const scene = new Scene("simple_scene");
SceneManager.addScene(scene);

scene.useSystem(EngineSystem.RenderSystem);
scene.useSystem(EngineSystem.AnimatorSystem);
scene.useSystem(EngineSystem.InputSystem);
scene.useSystem(EngineSystem.PhysicsSystem);
scene.useSystem(EngineSystem.CharacterControlerSystem);

const playerEntity = new GameEntity("player", "Player");
configurePlayer(playerEntity);
scene.addEntity(playerEntity);

const slimeEntity = new GameEntity("slime", "Enemy");
configureSlime(slimeEntity);
scene.addEntity(slimeEntity);

const cameraEntity = new GameEntity("camera", "MainCamera");
configureCamera(cameraEntity);
scene.addEntity(cameraEntity);

engine.loadScene("simple_scene");
engine.time.start();

