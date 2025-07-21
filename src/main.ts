import { engine } from "../api/engine.main";
import { ENGINE } from "../api/engine.manager";
import { ECS } from "../api/TwoD";
import { boxColliderGizmosSystem } from "../core/debug/gizmos/boxColliderGizmosSystem";
import { FontManager } from "../core/managers/FontManager";
import { generic_manager_add } from "../core/managers/generic_manager";
import { resourceManager } from "../core/managers/resources-manager";
import type { ImageFile, ShaderFile } from "../core/managers/shaderLoader";
import { AnimatorSystem } from "../core/components/animator";
import { ColliderSystem } from "../core/components/collider/collider.system";
import { PhysicsSystem } from "../core/components/collider/physics_system";
import { createComponentState } from "../core/components/ecs/component";
import { createSystemState } from "../core/components/ecs/system";
import { Scene } from "../core/components/scene/scene";
import { SpriteRenderSystem } from "../core/components/sprite-render";
import { TextMeshRenderSystem } from "../core/components/text-mesh/textMeshRender";
import { advanced_material_system } from "../core/resources/material/advanced_material_system";
import type { Material } from "../core/resources/material/material";
import { simple_material_system } from "../core/resources/material/simple_material_system";
import { textShaderSystem } from "../core/resources/material/text_shader_system";
import { water_material_system } from "../core/resources/material/water_material_system";
import { createTextMesh, createDynamicMeshVAO } from "../core/webgl/mesh_gl";
import { createCamera } from "./game/entities/camera.entity";
import { createPlayer } from "./game/entities/player.entity";
import { createSlime } from "./game/entities/slime.entity";
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










export const fontManager = new FontManager();










async function LoadResources() {




    // const quadLineMesh = createQuadLineMesh("quadLine", { x: 1, y: 1, z: 0 });
    // generic_manager_add(ENGINE.MANAGER.MESH, quadLineMesh.name, quadLineMesh);
    // const wire_square_instanced = createMeshVAO(ENGINE.WEB_GL, quadLineMesh);
    // generic_manager_add(ENGINE.MANAGER.VAO, "wire_square_instanced", wire_square_instanced);




    await fontManager.loadFont(
        "roboto",
        "/core/assets/fonts/roboto/roboto_italic.png",
        "/core/assets/fonts/roboto/roboto_italic.csv"
    )

    await fontManager.loadFont(
        "mono",
        "/core/assets/fonts/mono/mono.png",
        "/core/assets/fonts/mono/mono.csv"
    )


    const fontData = fontManager.getFont("roboto")!;

    const mesh = createTextMesh("ola mundo", fontData, 0.004);
    generic_manager_add(ENGINE.MANAGER.MESH, mesh.name, mesh);

    const vao = createDynamicMeshVAO(ENGINE.WEB_GL, mesh);
    generic_manager_add(ENGINE.MANAGER.VAO, mesh.name, vao);




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
            path: "/core/assets/images/primitive_sprites.png"
        }
    }


    const shaders: ShaderFile = {

        text: {
            vert: "core/assets/shaders/text.vert",
            frag: "core/assets/shaders/text.frag"
        },

        simple: {
            vert: "core/assets/shaders/simpleShader.vert",
            frag: "core/assets/shaders/simpleShader.frag"
        },
        advanced: {
            vert: "core/assets/shaders/advancedShader.vert",
            frag: "core/assets/shaders/advancedShader.frag"
        },
        water: {
            vert: "core/assets/shaders/simpleShader.vert",
            frag: "core/assets/shaders/waterShader.frag"
        },

        gizmos: {
            vert: "core/assets/shaders/gizmos.vert",
            frag: "core/assets/shaders/gizmos.frag"
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


engine.start();

const scene: Scene = {
    name: "simple_scene",
    COMPONENT_STATE: createComponentState(),
    SYSTEM_STATE: createSystemState()
}

Scene.setCurrentScene(scene)

const player = createPlayer("player");
Scene.addToScene(scene, player);

const slime = createSlime("slime");
Scene.addToScene(scene, slime);

const camera = createCamera();
Scene.addToScene(scene, camera);

ECS.System.addSystem(scene.SYSTEM_STATE, SpriteRenderSystem(scene.COMPONENT_STATE));
ECS.System.addSystem(scene.SYSTEM_STATE, CharacterControlerSystem(scene.COMPONENT_STATE));
ECS.System.addSystem(scene.SYSTEM_STATE, CharacterControllerAnimationSystem(scene.COMPONENT_STATE));
ECS.System.addSystem(scene.SYSTEM_STATE, AnimatorSystem(scene.COMPONENT_STATE));
// ECS.System.addSystem(scene.SYSTEM_STATE, TerrainSystem(scene.COMPONENT_STATE, player));
ECS.System.addSystem(scene.SYSTEM_STATE, CameraSystem(camera, player));
ECS.System.addSystem(scene.SYSTEM_STATE, ColliderSystem(scene.COMPONENT_STATE, scene.SYSTEM_STATE));
ECS.System.addSystem(scene.SYSTEM_STATE, PhysicsSystem(scene.COMPONENT_STATE));
ECS.System.addSystem(scene.SYSTEM_STATE, boxColliderGizmosSystem());
ECS.System.addSystem(scene.SYSTEM_STATE, TextMeshRenderSystem(scene.COMPONENT_STATE));