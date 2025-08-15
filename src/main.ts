import { GameEntity } from "./engine/core/base/GameEntity";
import { ImageFileLoader } from "./engine/core/loaders/ImageFileLoader";
import { TextFileLoader } from "./engine/core/loaders/TextFileLoader";
import { EngineResourceManager } from "./engine/core/managers/EngineResourceManager";
import { EngineSystem, EngineSystemManager } from "./engine/core/managers/EngineSystemManager";
import { Vec3 } from "./engine/core/math/Vec3";
import { Scene } from "./engine/core/scene/scene";
import { SceneManager } from "./engine/core/scene/SceneManager";
import { Engine } from "./engine/Engine";
import { ResourcesManager } from "./engine/global/manager/manager";
import { Camera } from "./engine/modules/components/render/Camera";
import { Transform } from "./engine/modules/components/spatial/Transform";
import type { MaterialType } from "./engine/modules/resources";
import { AdvancedShaderSystem } from "./engine/modules/resources/material/AdvancedShaderSystem";
import { SimpleShaderSystem } from "./engine/modules/resources/material/SimpleShaderSystem";
import { Texture } from "./engine/modules/resources/texture/types";
import { AnimatorSystem, PhysicsSystem, RenderSystem } from "./engine/modules/systems";
import { FreeCameraSystem } from "./engine/modules/systems/FreeCamera";
import { createFillSquareMesh } from "./engine/resources/geometries/Square";
import { createCamera as configureCamera } from "./game/entities/camera.entity";
import { createPlayer as configurePlayer } from "./game/entities/player.entity";
import { createSlime as configureSlime } from "./game/entities/slime.entity";
import { CameraSystem } from "./game/systems/CameraSystem";
import { CharacterControlerSystem } from "./game/systems/CharacterControlerSystem";
import { CharacterControllerAnimationSystem } from "./game/systems/CharacterControllerAnimationSystem";
import { InputSystem } from "./game/systems/InputSystem";
import { TerrainSystem } from "./game/systems/procedural-world/TerrainSystem";

export class EditorCamera {
    public cameraEntiy: GameEntity;
    public cameraComponent: Camera;
    public transformComponent: Transform;

    constructor() {
        this.cameraEntiy = new GameEntity();
        this.cameraComponent = new Camera();
        this.transformComponent = new Transform();
        this.transformComponent.position.z = 12;

        this.cameraComponent.setGameEntity(this.cameraEntiy);
        this.transformComponent.setGameEntity(this.cameraEntiy);
    }
}

export class Editor extends Engine {

    private editorCamera: EditorCamera = new EditorCamera();

    constructor() {
        super();

        this.onLoadSceneCallback = (scene) => {
            scene.addEntity(this.editorCamera.cameraEntiy);
            scene.addComponent(this.editorCamera.cameraEntiy, this.editorCamera.cameraComponent);
            scene.addComponent(this.editorCamera.cameraEntiy, this.editorCamera.transformComponent);
        }
    }
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

const simpleMaterial: MaterialType = {
    name: "simpleMaterial",
    shaderName: "simple",
};

ResourcesManager.MaterialManager.add(simpleMaterial.name, simpleMaterial);
const simpleShader = new SimpleShaderSystem();
ResourcesManager.ShaderSystemManager.add(simpleMaterial.name, simpleShader);


const game = new Engine();
const editor = new Editor();


EngineResourceManager.register("simpleShaderVertex", new TextFileLoader("./src/engine/assets/shaders/simpleShader.vert"));
EngineResourceManager.register("simpleShaderFragment", new TextFileLoader("./src/engine/assets/shaders/simpleShader.frag"));

EngineResourceManager.register("advancedShaderVertex", new TextFileLoader("./src/engine/assets/shaders/advancedShader.vert"));
EngineResourceManager.register("advancedShaderFragment", new TextFileLoader("./src/engine/assets/shaders/advancedShader.frag"));

EngineResourceManager.register("player", new ImageFileLoader("./src/game/assets/images/Player.png"));
EngineResourceManager.register("slime", new ImageFileLoader("./src/game/assets/images/Slime.png"));

await EngineResourceManager.load();

const playerTexture = new Texture("player", "player");
const slimeTexture = new Texture("slime", "slime");

game.compileShader("advanced", EngineResourceManager.get("advancedShaderVertex")!, EngineResourceManager.get("advancedShaderFragment")!);
game.compileShader("simple", EngineResourceManager.get("simpleShaderVertex")!, EngineResourceManager.get("simpleShaderFragment")!);

editor.compileShader("advanced", EngineResourceManager.get("advancedShaderVertex")!, EngineResourceManager.get("advancedShaderFragment")!);
editor.compileShader("simple", EngineResourceManager.get("simpleShaderVertex")!, EngineResourceManager.get("simpleShaderFragment")!);


game.compileTexture(playerTexture);
game.compileTexture(slimeTexture);
game.compileMesh(squareMesh);


editor.compileTexture(playerTexture);
editor.compileTexture(slimeTexture);
editor.compileMesh(squareMesh);


EngineSystemManager.register(EngineSystem.RenderSystem, () => new RenderSystem());
EngineSystemManager.register(EngineSystem.TerrainSystem, () => new TerrainSystem());
EngineSystemManager.register(EngineSystem.AnimatorSystem, () => new AnimatorSystem());
EngineSystemManager.register(EngineSystem.InputSystem, () => new InputSystem());
EngineSystemManager.register(EngineSystem.PhysicsSystem, () => new PhysicsSystem());
EngineSystemManager.register(EngineSystem.CameraSystem, () => new CameraSystem());
EngineSystemManager.register(EngineSystem.CharacterControlerSystem, () => new CharacterControlerSystem());
EngineSystemManager.register(EngineSystem.CharacterControlerAnimationSystem, () => new CharacterControllerAnimationSystem());


EngineSystemManager.register(EngineSystem.EditorFreeCameraSystem, () => new FreeCameraSystem());




EngineSystemManager.register(EngineSystem.EditorRenderSystem, () => new CharacterControllerAnimationSystem());

const scene = new Scene("simple_scene");
const scene2 = new Scene("simple_scene_2");
SceneManager.addScene(scene);
SceneManager.addScene(scene2);
game.useSystem(EngineSystem.RenderSystem);
game.useSystem(EngineSystem.AnimatorSystem);
game.useSystem(EngineSystem.InputSystem);
game.useSystem(EngineSystem.PhysicsSystem);
game.useSystem(EngineSystem.CharacterControlerSystem);
game.useSystem(EngineSystem.CharacterControlerAnimationSystem);
game.useSystem(EngineSystem.CameraSystem);
game.useSystem(EngineSystem.TerrainSystem);

editor.useSystem(EngineSystem.RenderSystem);
editor.useSystem(EngineSystem.EditorFreeCameraSystem);


const playerEntity = new GameEntity({ name: "player", tag: "Player" });
configurePlayer(scene, playerEntity);
scene.addEntity(playerEntity);

const slimeEntity = new GameEntity({ name: "slime", tag: "Enemy" });
configureSlime(scene, slimeEntity);
scene.addEntity(slimeEntity);

const cameraEntity = new GameEntity({ name: "camera", tag: "MainCamera" });
configureCamera(scene, cameraEntity);
scene.addEntity(cameraEntity);


editor.loadScene("simple_scene");
game.loadScene("simple_scene");

editor.time.start()
game.time.start()

const editorContainer = document.querySelector(".editor-container") as HTMLDivElement;
const editorCanvas = editor.getElement() as HTMLCanvasElement;
editorCanvas.width = editorContainer.getBoundingClientRect().width;
editorCanvas.height = editorContainer.getBoundingClientRect().height;
editorContainer.appendChild(editorCanvas);

const gameContainer = document.querySelector(".game-container") as HTMLDivElement;

const gameCanvas = game.getElement() as HTMLCanvasElement;
gameCanvas.width = gameContainer.getBoundingClientRect().width;
gameCanvas.height = gameContainer.getBoundingClientRect().height;

gameContainer.appendChild(gameCanvas);

const play = document.getElementById("game-time-start") as HTMLButtonElement;
play.addEventListener("click", () => game.time.start());

const pause = document.getElementById("game-time-pause") as HTMLButtonElement;
pause.addEventListener("click", () => game.time.pause());

const resume = document.getElementById("game-time-resume") as HTMLButtonElement;
resume.addEventListener("click", () => game.time.resume());

const stop = document.getElementById("game-time-stop") as HTMLButtonElement;
stop.addEventListener("click", () => game.time.stop());

window.addEventListener("resize", () => {
    editorCanvas.width = editorContainer.getBoundingClientRect().width;
    editorCanvas.height = editorContainer.getBoundingClientRect().height;
    gameCanvas.width = gameContainer.getBoundingClientRect().width;
    gameCanvas.height = gameContainer.getBoundingClientRect().height;
})




