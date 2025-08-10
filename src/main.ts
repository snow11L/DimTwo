
import type { MaterialType } from "./engine/core";
import type { Render } from "./engine/core/base/Render";
import { Global } from "./engine/core/managers/engine.manager";
import { Scene } from "./engine/core/scene/scene";
import { SceneManager } from "./engine/core/scene/SceneManager";
import { Engine } from "./engine/Engine";
import { ResourcesManager } from "./engine/global/manager/manager";
import { ComponentTypes } from "./engine/modules/components/component-type";
import { get_category } from "./engine/modules/generators/get_component";
import { resourceManager } from "./engine/modules/resources-manager";
import { advanced_material_system } from "./engine/modules/resources/material/advanced_material_system";
import { simple_material_system } from "./engine/modules/resources/material/simple_material_system";
import { water_material_system } from "./engine/modules/resources/material/water_material_system";
import type { Mesh } from "./engine/modules/resources/mesh/Mesh";
import type { ImageFile, ShaderFile } from "./engine/modules/shaderLoader";
import { AnimatorSystem, ColliderSystem, PhysicsSystem, RenderSystem } from "./engine/modules/systems";
import { createCamera } from "./game/entities/camera.entity";
import { createPlayer } from "./game/entities/player.entity";
import { createSlime } from "./game/entities/slime.entity";
import { CameraSystem } from "./game/systems/camera_system";
import CharacterControllerAnimationSystem from "./game/systems/character-controller/character-controller-animations";
import CharacterControlerSystem from "./game/systems/character-controller/character-controller-system";
import { InputSystemComponent } from "./game/systems/character-controller/InputSystem";


function material_create_and_link(name: string, shader: string) {

    const material: MaterialType = {
        name: name,
        shaderName: shader
    };

    ResourcesManager.MaterialManager.add(material.name, material);
}

async function LoadResources() {

    // export const fontManager = new FontManager();
    // await fontManager.loadFont(
    //     "roboto",
    //     "/core/assets/fonts/roboto/roboto_italic.png",
    //     "/core/assets/fonts/roboto/roboto_italic.csv"
    // )
    // await fontManager.loadFont(
    //     "mono",
    //     "/core/assets/fonts/mono/mono.png",
    //     "/core/assets/fonts/mono/mono.csv"
    // )


    // const fontData = fontManager.getFont("roboto")!;

    // const mesh = createTextMesh("ola mundo", fontData, 0.004);
    // generic_manager_add(ENGINE.MANAGER.MESH, mesh.name, mesh);

    // const vao = createDynamicMeshVAO(ENGINE.WEB_GL, mesh);
    // generic_manager_add(ENGINE.MANAGER.VAO, mesh.name, vao);

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
    const advanced_shader_color_system = advanced_material_system(advanced_material);
    ResourcesManager.ShaderSystemManager.add(advanced_material.name, advanced_shader_color_system);


    const water_material: MaterialType = {
        name: "water_material",
        shaderName: "water",

    };
    ResourcesManager.MaterialManager.add(water_material.name, water_material);

    const simple_shader_water_system = water_material_system(water_material);
    ResourcesManager.ShaderSystemManager.add(water_material.name, simple_shader_water_system);

    const textMaterial: MaterialType = {
        name: "text_material",
        shaderName: "text",

    }
    ResourcesManager.MaterialManager.add(textMaterial.name, textMaterial);
    /*     const textSystem = textShaderSystem(textMaterial);
        ResourcesManager.ShaderSystemManager.generic_manager_add( textMaterial.name, textSystem); */

}

await LoadResources();

const scene = new Scene("simple_scene");
SceneManager.addScene(scene);
SceneManager.loadScene("simple_scene");

const player = createPlayer("player");
scene.addToScene(scene, player);


const slime = createSlime("slime");
scene.addToScene(scene, slime);

const camera = createCamera();
scene.addToScene(scene, camera);

scene.ECSSystems.addSystem(RenderSystem());
scene.ECSSystems.addSystem(CharacterControlerSystem());
scene.ECSSystems.addSystem(CharacterControllerAnimationSystem());
scene.ECSSystems.addSystem(AnimatorSystem());
scene.ECSSystems.addSystem(CameraSystem(camera, player));
scene.ECSSystems.addSystem(ColliderSystem());
scene.ECSSystems.addSystem(PhysicsSystem());
scene.ECSSystems.addSystem(InputSystemComponent());
// SystemState.addSystem(scene.systems, boxColliderGizmosSystem());
// SystemState.addSystem(scene.systems, circleColliderGizmosSystem());


const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WebGL = canvas.getContext('webgl2');
if (!WebGL) throw new Error("WebGL not supported");

const engine = new Engine(WebGL);
engine.time.start();


export function getMeshesUsedInScene(): Set<Mesh> {
    const renderers = get_category<Render>(ComponentTypes.Render);
    const meshesUsed = new Set<Mesh>();
    for (const render of renderers) {
        const mesh = ResourcesManager.MeshManager.generic_manager_get(render.meshID);
        if (mesh) meshesUsed.add(mesh);
    }
    return meshesUsed;
}

const meshs = getMeshesUsedInScene();
meshs.forEach(m => {
    const vao = m.createMeshVAO(Global.WebGL);
    scene.vao.values.set(m.instanceID.getValue(), vao)

})