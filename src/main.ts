import { GameEntity } from "./engine/core/base/GameEntity";
import { EngineSystem, EngineSystemManager } from "./engine/core/managers/SystemManager";
import { Scene } from "./engine/core/scene/scene";
import { SceneManager } from "./engine/core/scene/SceneManager";
import { Engine } from "./engine/Engine";
import { ResourcesManager } from "./engine/global/manager/manager";
import type { MaterialType } from "./engine/modules/resources";
import { resourceManager } from "./engine/modules/resources-manager";
import { advancedShaderSystem } from "./engine/modules/resources/material/advanced_material_system";
import { simple_material_system } from "./engine/modules/resources/material/simple_material_system";
import type { ImageFile, ShaderFile } from "./engine/modules/shaderLoader";
import { AnimatorSystem, PhysicsSystem, RenderSystem } from "./engine/modules/systems";
import { createCamera as configureCamera } from "./game/entities/camera.entity";
import { createPlayer as configurePlayer } from "./game/entities/player.entity";
import { createSlime as configureSlime } from "./game/entities/slime.entity";
import { CharacterControlerSystem } from "./game/systems/character-controller/character-controller-system";

import { InputSystem } from "./game/systems/character-controller/InputSystem";


function material_create_and_link(name: string, shader: string) {

    const material: MaterialType = {
        name: name,
        shaderName: shader
    };

    ResourcesManager.MaterialManager.add(material.name, material);
}

async function LoadResources() {
    const images: ImageFile = {
        player: {
            path: "./src/game/assets/images/Player.png"
        },
        slime: {
            path: "./src/game/assets/images/Slime.png"
        },
        oakTree: {
            path: "./src/game/assets/images/OakTree.png"
        },
        primitives: {
            path: "./src/engine/assets/images/primitive_sprites.png"
        }
    }
    const shaders: ShaderFile = {

        text: {
            vert: "./src/engine/assets/shaders/text.vert",
            frag: "./src/engine/assets/shaders/text.frag"
        },

        simple: {
            vert: "./src/engine/assets/shaders/simpleShader.vert",
            frag: "./src/engine/assets/shaders/simpleShader.frag"
        },
        advanced: {
            vert: "./src/engine/assets/shaders/advancedShader.vert",
            frag: "./src/engine/assets/shaders/advancedShader.frag"
        },
        water: {
            vert: "./src/engine/assets/shaders/simpleShader.vert",
            frag: "./src/engine/assets/shaders/waterShader.frag"
        },

        gizmos: {
            vert: "./src/engine/assets/shaders/gizmos.vert",
            frag: "./src/engine/assets/shaders/gizmos.frag"
        }
    }

    await resourceManager.load_images_and_create_textures(images);
    await resourceManager.load_shaders_and_compile(shaders);

    // ----------------------------------------------------------------
    material_create_and_link("simple_material", "simple");

    const simple_shader_color_system = simple_material_system("simple");
    ResourcesManager.ShaderSystemManager.add("simple_material", simple_shader_color_system);

    // ----------------------------------------------------------------


    const advanced_material: MaterialType = {
        name: "advanced_material",
        shaderName: "advanced",
    };

    ResourcesManager.MaterialManager.add(advanced_material.name, advanced_material);


    const advancedShader = new advancedShaderSystem();
    ResourcesManager.ShaderSystemManager.add(advanced_material.name, advancedShader);


    /*  const water_material: MaterialType = {
         name: "water_material",
         shaderName: "water",
 
     };
     ResourcesManager.MaterialManager.add(water_material.name, water_material);
 
     const simple_shader_water_system = water_material_system(water_material);
     ResourcesManager.ShaderSystemManager.add(water_material.name, simple_shader_water_system); */

}

await LoadResources();
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const WebGL = canvas.getContext('webgl2');
if (!WebGL) throw new Error("WebGL not supported");

const engine = new Engine(WebGL);

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

