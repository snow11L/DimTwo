import { GameEntity } from "./engine/core/base/GameEntity";
import { ImageFileLoader } from "./engine/core/loaders/ImageFileLoader";
import { TextFileLoader } from "./engine/core/loaders/TextFileLoader";
import { EngineResourceManager } from "./engine/core/managers/EngineResourceManager";
import { EngineSystem, EngineSystemManager } from "./engine/core/managers/EngineSystemManager";
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

const advanced_material: MaterialType = {
    name: "advanced_material",
    shaderName: "advanced",
};

ResourcesManager.MaterialManager.add(advanced_material.name, advanced_material);
const advancedShader = new AdvancedShaderSystem();
ResourcesManager.ShaderSystemManager.add(advanced_material.name, advancedShader);


const engine = new Engine(getWebGL());

EngineResourceManager.register("simpleShaderVertex", new TextFileLoader("./src/engine/assets/shaders/simpleShader.vert"));
EngineResourceManager.register("simpleShaderFragment", new TextFileLoader("./src/engine/assets/shaders/simpleShader.frag"));

EngineResourceManager.register("advancedShaderVertex", new TextFileLoader("./src/engine/assets/shaders/advancedShader.vert"));
EngineResourceManager.register("advancedShaderFragment", new TextFileLoader("./src/engine/assets/shaders/advancedShader.frag"));

EngineResourceManager.register("player", new ImageFileLoader("./src/game/assets/images/Player.png"));
EngineResourceManager.register("slime", new ImageFileLoader("./src/game/assets/images/Slime.png"));

await EngineResourceManager.load();

engine.loadShader("advanced", EngineResourceManager.get("advancedShaderVertex")!, EngineResourceManager.get("advancedShaderFragment")!);
engine.loadTexture("player", EngineResourceManager.get("player")!)
engine.loadTexture("slime", EngineResourceManager.get("slime")!)

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

