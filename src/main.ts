import { engine } from "../api/engine.main";
import { SystemState } from "../TwoD";
import type { Render } from "../TwoD/base/Render";
import { SpriteRenderSystem } from "../TwoD/components/render/spriteRender";
import { boxColliderGizmosSystem } from "../TwoD/debug/gizmos/boxColliderGizmosSystem";
import { circleColliderGizmosSystem } from "../TwoD/debug/gizmos/circleColliderGizmosSystem";
import { get_category } from "../TwoD/generators/get_component";
import { ENGINE } from "../TwoD/managers/engine.manager";
import { generic_manager_add, generic_manager_get } from "../TwoD/managers/generic_manager";
import { resourceManager } from "../TwoD/managers/resources-manager";
import type { ImageFile, ShaderFile } from "../TwoD/managers/shaderLoader";
import { advanced_material_system } from "../TwoD/resources/material/advanced_material_system";
import type { Material } from "../TwoD/resources/material/material";
import { simple_material_system } from "../TwoD/resources/material/simple_material_system";
import { textShaderSystem } from "../TwoD/resources/material/text_shader_system";
import { water_material_system } from "../TwoD/resources/material/water_material_system";
import type { Mesh } from "../TwoD/resources/mesh/mesh";
import { Scene } from "../TwoD/resources/scene/scene";
import { AnimatorSystem } from "../TwoD/systems/animator.system";
import { ColliderSystem } from "../TwoD/systems/collider.system";
import { PhysicsSystem } from "../TwoD/systems/PhysicsSystem";
import { ComponentType } from "../TwoD/types/component-type";
import { createMeshVAO } from "../TwoD/webgl/mesh_gl";
import { createCamera } from "./game/entities/camera.entity";
import { createPlayer } from "./game/entities/player.entity";
import { createSlime } from "./game/entities/slime.entity";
import { InputSystem } from "./game/input/input.system";
import { CameraSystem } from "./game/systems/camera_system";
import CharacterControllerAnimationSystem from "./game/systems/character-controller/character-controller-animations";
import CharacterControlerSystem from "./game/systems/character-controller/character-controller-system";

function material_create_and_link(name: string, shader: string) {

    const material: Material = {
        name: name,
        shaderName: shader
    };

    generic_manager_add(ENGINE.MANAGER.MATERIAL, material.name, material);
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
    generic_manager_add(ENGINE.MANAGER.SHADER_SYSTEM, "simple_material", simple_shader_color_system);

    // ----------------------------------------------------------------


    const advanced_material: Material = {
        name: "advanced_material",
        shaderName: "advanced",
    };

    generic_manager_add(ENGINE.MANAGER.MATERIAL, advanced_material.name, advanced_material);
    const advanced_shader_color_system = advanced_material_system(advanced_material);
    generic_manager_add(ENGINE.MANAGER.SHADER_SYSTEM, advanced_material.name, advanced_shader_color_system);


    const water_material: Material = {
        name: "water_material",
        shaderName: "water",

    };
    generic_manager_add(ENGINE.MANAGER.MATERIAL, water_material.name, water_material);

    const simple_shader_water_system = water_material_system(water_material);
    generic_manager_add(ENGINE.MANAGER.SHADER_SYSTEM, water_material.name, simple_shader_water_system);

    const textMaterial: Material = {
        name: "text_material",
        shaderName: "text",

    }
    generic_manager_add(ENGINE.MANAGER.MATERIAL, textMaterial.name, textMaterial);
    const textSystem = textShaderSystem(textMaterial);
    generic_manager_add(ENGINE.MANAGER.SHADER_SYSTEM, textMaterial.name, textSystem);

}

await LoadResources();

const scene = Scene.create("simple_scene");

console.log(scene)
Scene.setCurrentScene(scene)

const player = createPlayer("player");
Scene.addToScene(scene, player);


const slime = createSlime("slime");
Scene.addToScene(scene, slime);

const camera = createCamera();
Scene.addToScene(scene, camera);

SystemState.addSystem(scene.systems, SpriteRenderSystem(scene.components));
SystemState.addSystem(scene.systems, CharacterControlerSystem(scene.components));
SystemState.addSystem(scene.systems, CharacterControllerAnimationSystem(scene.components));
SystemState.addSystem(scene.systems, AnimatorSystem(scene.components));
SystemState.addSystem(scene.systems, CameraSystem(camera, player));
SystemState.addSystem(scene.systems, ColliderSystem(scene.components, scene.systems));
SystemState.addSystem(scene.systems, PhysicsSystem(scene.components));
SystemState.addSystem(scene.systems, InputSystem());
SystemState.addSystem(scene.systems, boxColliderGizmosSystem());
SystemState.addSystem(scene.systems, circleColliderGizmosSystem());

engine.start();

export function getMeshesUsedInScene(): Set<Mesh> {
    const renderers = get_category<Render>(ComponentType.Render);
    const meshesUsed = new Set<Mesh>();
    for (const render of renderers) {
        const mesh = generic_manager_get(ENGINE.MANAGER.MESH, render.meshID);
        if (mesh) meshesUsed.add(mesh);
    }
    return meshesUsed;
}

const meshs = getMeshesUsedInScene();
meshs.forEach(m => {
    const vao = createMeshVAO(ENGINE.WEB_GL, m);
    scene.vao.values.set(m.instanceID, vao)

})