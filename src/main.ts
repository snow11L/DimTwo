
import { ComponentTypes } from "../TwoD/components/component-type";
import type { MaterialType } from "../TwoD/core";
import type { Render } from "../TwoD/core/base/Render";
import { engine } from "../TwoD/core/core/Engine";
import { Global } from "../TwoD/core/managers/engine.manager";
import { resourceManager } from "../TwoD/core/managers/resources-manager";
import type { ImageFile, ShaderFile } from "../TwoD/core/managers/shaderLoader";
import { advanced_material_system } from "../TwoD/core/resources/material/advanced_material_system";
import { simple_material_system } from "../TwoD/core/resources/material/simple_material_system";
import { water_material_system } from "../TwoD/core/resources/material/water_material_system";
import type { Mesh } from "../TwoD/core/resources/mesh/Mesh";
import { Scene } from "../TwoD/core/resources/scene/scene";
import { AnimatorSystem, ColliderSystem, PhysicsSystem, RenderSystem } from "../TwoD/core/systems";
import { InputSystem } from "../TwoD/core/systems/InputSystem";
import { createMeshVAO } from "../TwoD/core/webgl/mesh_gl";
import { get_category } from "../TwoD/generators/get_component";
import { createCamera } from "./game/entities/camera.entity";
import { createPlayer } from "./game/entities/player.entity";
import { createSlime } from "./game/entities/slime.entity";
import { CameraSystem } from "./game/systems/camera_system";
import CharacterControllerAnimationSystem from "./game/systems/character-controller/character-controller-animations";
import CharacterControlerSystem from "./game/systems/character-controller/character-controller-system";

function material_create_and_link(name: string, shader: string) {

    const material: MaterialType = {
        name: name,
        shaderName: shader
    };

    Global.ResourcesManager.MaterialManager.generic_manager_add(material.name, material);
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
            path: "src/game/assets/images/Player.png"
        },
        slime: {
            path: "src/game/assets/images/Slime.png"
        },
        oakTree: {
            path: "src/game/assets/images/OakTree.png"
        },
        primitives: {
            path: "TwoD/assets/images/primitive_sprites.png"
        }
    }
    const shaders: ShaderFile = {

        text: {
            vert: "TwoD/assets/shaders/text.vert",
            frag: "TwoD/assets/shaders/text.frag"
        },

        simple: {
            vert: "TwoD/assets/shaders/simpleShader.vert",
            frag: "TwoD/assets/shaders/simpleShader.frag"
        },
        advanced: {
            vert: "TwoD/assets/shaders/advancedShader.vert",
            frag: "TwoD/assets/shaders/advancedShader.frag"
        },
        water: {
            vert: "TwoD/assets/shaders/simpleShader.vert",
            frag: "TwoD/assets/shaders/waterShader.frag"
        },

        gizmos: {
            vert: "TwoD/assets/shaders/gizmos.vert",
            frag: "TwoD/assets/shaders/gizmos.frag"
        }
    }

    await resourceManager.load_images_and_create_textures(images);
    await resourceManager.load_shaders_and_compile(shaders);

    // ----------------------------------------------------------------
    material_create_and_link("simple_material", "simple");

    const simple_shader_color_system = simple_material_system("simple");
    Global.ResourcesManager.ShaderSystemManager.generic_manager_add("simple_material", simple_shader_color_system);

    // ----------------------------------------------------------------


    const advanced_material: MaterialType = {
        name: "advanced_material",
        shaderName: "advanced",
    };

    Global.ResourcesManager.MaterialManager.generic_manager_add(advanced_material.name, advanced_material);
    const advanced_shader_color_system = advanced_material_system(advanced_material);
    Global.ResourcesManager.ShaderSystemManager.generic_manager_add(advanced_material.name, advanced_shader_color_system);


    const water_material: MaterialType = {
        name: "water_material",
        shaderName: "water",

    };
    Global.ResourcesManager.MaterialManager.generic_manager_add(water_material.name, water_material);

    const simple_shader_water_system = water_material_system(water_material);
    Global.ResourcesManager.ShaderSystemManager.generic_manager_add(water_material.name, simple_shader_water_system);

    const textMaterial: MaterialType = {
        name: "text_material",
        shaderName: "text",

    }
    Global.ResourcesManager.MaterialManager.generic_manager_add(textMaterial.name, textMaterial);
    /*     const textSystem = textShaderSystem(textMaterial);
        Global.ResourcesManager.ShaderSystemManager.generic_manager_add( textMaterial.name, textSystem); */

}

await LoadResources();

const scene = new Scene("simple_scene");
Scene.setCurrentScene(scene);

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
scene.ECSSystems.addSystem(InputSystem());
// SystemState.addSystem(scene.systems, boxColliderGizmosSystem());
// SystemState.addSystem(scene.systems, circleColliderGizmosSystem());

engine.start();

export function getMeshesUsedInScene(): Set<Mesh> {
    const renderers = get_category<Render>(ComponentTypes.Render);
    const meshesUsed = new Set<Mesh>();
    for (const render of renderers) {
        const mesh = Global.ResourcesManager.MeshManager.generic_manager_get(render.meshID);
        if (mesh) meshesUsed.add(mesh);
    }
    return meshesUsed;
}

const meshs = getMeshesUsedInScene();
meshs.forEach(m => {
    const vao = createMeshVAO(Global.WebGL, m);
    scene.vao.values.set(m.instanceID.getValue(), vao)

})