import { GameEntity } from "./engine/core/base/GameEntity";
import { ImageFileLoader } from "./engine/core/loaders/ImageFileLoader";
import { TextFileLoader } from "./engine/core/loaders/TextFileLoader";
import { EngineResourceManager } from "./engine/core/managers/EngineResourceManager";
import { EngineSystem, EngineSystemManager } from "./engine/core/managers/EngineSystemManager";
import { Vec3 } from "./engine/core/math/vec3/ Vec3";
import { Scene } from "./engine/core/scene/scene";
import { SceneManager } from "./engine/core/scene/SceneManager";
import { Engine } from "./engine/Engine";
import { ResourcesManager } from "./engine/global/manager/manager";
import type { MaterialType } from "./engine/modules/resources";
import { AdvancedShaderSystem } from "./engine/modules/resources/material/AdvancedShaderSystem";
import { Texture } from "./engine/modules/resources/texture/types";
import { AnimatorSystem, PhysicsSystem, RenderSystem } from "./engine/modules/systems";
import { createFillSquareMesh } from "./engine/resources/geometries/Square";
import { createCamera as configureCamera } from "./game/entities/camera.entity";
import { createPlayer as configurePlayer } from "./game/entities/player.entity";
import { createSlime as configureSlime } from "./game/entities/slime.entity";
import { CameraSystem } from "./game/systems/CameraSystem";
import { CharacterControlerSystem } from "./game/systems/CharacterControlerSystem";
import { CharacterControllerAnimationSystem } from "./game/systems/CharacterControllerAnimationSystem";
import { InputSystem } from "./game/systems/InputSystem";


function getWebGL() {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const WebGL = canvas.getContext('webgl2');
    if (!WebGL) throw new Error("WebGL not supported");
    return WebGL;
}

const squareMesh = createFillSquareMesh("fillSquare", new Vec3(1, 1, 0));
ResourcesManager.MeshManager.add("fillSquare", squareMesh);





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



const playerTexture = new Texture("player","player");
const slimeTexture = new Texture("slime", "slime");



engine.compileShader("advanced", EngineResourceManager.get("advancedShaderVertex")!, EngineResourceManager.get("advancedShaderFragment")!);
engine.compileTexture(playerTexture);
engine.compileTexture(slimeTexture);
engine.compileMesh(squareMesh);

EngineSystemManager.register(EngineSystem.RenderSystem, () => new RenderSystem());
EngineSystemManager.register(EngineSystem.AnimatorSystem, () => new AnimatorSystem());
EngineSystemManager.register(EngineSystem.InputSystem, () => new InputSystem());
EngineSystemManager.register(EngineSystem.PhysicsSystem, () => new PhysicsSystem());
EngineSystemManager.register(EngineSystem.CameraSystem, () => new CameraSystem());
EngineSystemManager.register(EngineSystem.CharacterControlerSystem, () => new CharacterControlerSystem());
EngineSystemManager.register(EngineSystem.CharacterControlerAnimationSystem, () => new CharacterControllerAnimationSystem());

const scene = new Scene("simple_scene");
SceneManager.addScene(scene);

scene.useSystem(EngineSystem.RenderSystem);
scene.useSystem(EngineSystem.AnimatorSystem);
scene.useSystem(EngineSystem.InputSystem);
scene.useSystem(EngineSystem.PhysicsSystem);
scene.useSystem(EngineSystem.CharacterControlerSystem);
scene.useSystem(EngineSystem.CharacterControlerAnimationSystem);
scene.useSystem(EngineSystem.CameraSystem);

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


console.log(scene.entities.getByTag("MainCamera"))

