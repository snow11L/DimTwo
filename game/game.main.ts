import { resourceManager } from "../core/managers/resources-manager";
import { ECS } from "../engine/TwoD";
import { generic_manager_add } from "../core/managers/generic_manager";
import { createCamera } from "./entities/camera.entity";
import { createPlayer } from "./entities/player.entity";
import type { Material } from "../core/webgl/material/material";
import { createSystemState } from "../core/gears/ecs/system";
import { SpriteRenderSystem } from "../core/gears/render/sprite_render";
import CharacterControlerSystem from "./systems/character-controller/character-controller-system";
import { AnimatorSystem } from "../core/gears/animator";
import CharacterControllerAnimationSystem from "./systems/character-controller/character-controller-animations";
import { CameraSystem } from "./systems/camera_system";
import { ColliderSystem } from "../core/gears/collider/collider.system";
import { PhysicsSystem } from "../core/gears/collider/physics_system";
import { simple_material_system } from "../core/webgl/material/simple_material_system";
import { advanced_material_system } from "../core/webgl/material/advanced_material_system";
import { water_material_system } from "../core/webgl/material/water_material_system";
import { createSlime } from "./entities/slime.entity";
import { ENGINE } from "../engine/engine.manager";
import { type ShaderFile, type ImageFile } from "../core/managers/shaderLoader";
import { createQuadLineMesh, createQuadMesh } from "../core/assets/geometries/quadMesh";
import { createDynamicMeshVAO, createMeshVAO, createTextMesh, updateDynamicMesh } from "../core/webgl/mesh_gl";
import { boxColliderGizmosSystem } from "../core/debug/gizmos/boxColliderGizmosSystem";
import { Color } from "./systems/procedural-world/color";
import { Scene } from "../core/gears/scene/scene";
import { createComponentState } from "../core/gears/ecs/component";
import { FontManager } from "../core/managers/FontManager";
import { textShaderSystem } from "../core/webgl/material/text_shader_system";
import { TextMeshRenderSystem } from "../core/gears/render/sprite_render/textMeshRender";

function material_create_and_link(name: string, shader: string) {

    const material: Material = {
        name: name,
        shaderName: shader,
        props: [
            { name: "uColor", type: "color", value: Color.rgba(255, 255, 255, 1) }
        ]
    };

    generic_manager_add(ENGINE.MANAGER.MATERIAL, material.name, material);
}

export const fontManager = new FontManager();

async function LoadResources() {

    const QUAD_MESH = createQuadMesh("quad_mesh", { x: 1, y: 1, z: 0 });
    generic_manager_add(ENGINE.MANAGER.MESH, QUAD_MESH.name, QUAD_MESH);
    const square_vao = createMeshVAO(ENGINE.WEB_GL, QUAD_MESH);
    generic_manager_add(ENGINE.MANAGER.VAO, QUAD_MESH.name, square_vao);

    const quadLineMesh = createQuadLineMesh("quadLine", { x: 1, y: 1, z: 0 });
    generic_manager_add(ENGINE.MANAGER.MESH, quadLineMesh.name, quadLineMesh);
    const wire_square_instanced = createMeshVAO(ENGINE.WEB_GL, quadLineMesh);
    generic_manager_add(ENGINE.MANAGER.VAO, "wire_square_instanced", wire_square_instanced);




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
            path: "/game/assets/images/Player.png"
        },
        slime: {
            path: "/game/assets/images/Slime.png"
        },
        oakTree: {
            path: "game/assets/images/OakTree.png"
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


export async function GameMain() {

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
}