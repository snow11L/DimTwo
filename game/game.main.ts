import { resourceManager } from "../core/managers/resources-manager";
import { ECS } from "../engine/TwoD";
import { generic_manager_add } from "../core/managers/generic_manager";
import { createCamera } from "./entities/camera.entity";
import { createPlayer } from "./entities/player.entity";
import type { Material } from "../core/webgl/material/material";
import { SYSTEM_STATE } from "../core/gears/ecs/system";
import { SpriteRenderSystem } from "../core/gears/render/sprite_render";
import CharacterControlerSystem from "./systems/character-controller/character-controller-system";
import { AnimatorSystem } from "../core/gears/animator";
import CharacterControllerAnimationSystem from "./systems/character-controller/character-controller-animations";
import { TerrainSystem } from "./systems/procedural-world/terrain-system";
import { CameraSystem } from "./systems/camera_system";
import { SHADER_SYSTEM_MANAGER } from "../core/managers/shader_system_manager";
import { ColliderSystem } from "../core/gears/collider/collider.system";
import { PhysicsSystem } from "../core/gears/collider/physics_system";
import { simple_material_system } from "../core/webgl/material/simple_material_system";
import { advanced_material_system } from "../core/webgl/material/advanced_material_system";
import { water_material_system } from "../core/webgl/material/water_material_system";
import { createSlime } from "./entities/slime.entity";
import { ENGINE } from "../engine/engine.manager";
import { type ShaderFile, type TextureFile } from "../core/managers/shaderLoader";
import { createQuadLineMesh, createQuadMesh } from "../core/assets/geometries/quadMesh";
import { VAO_MANAGER } from "../core/managers/vao_manager";
import { createInstancedMeshVAO, createMeshVAO } from "../core/webgl/mesh_gl";
import { boxColliderGizmosSystem } from "../core/debug/gizmos/boxColliderGizmosSystem";
import { Color } from "./systems/procedural-world/color";

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

async function LoadResources() {

    const QUAD_MESH = createQuadMesh("quad_mesh", { x: 1, y: 1, z: 0 });
    generic_manager_add(ENGINE.MANAGER.MESH, QUAD_MESH.name, QUAD_MESH);
    const square_vao = createMeshVAO(ENGINE.WEB_GL, QUAD_MESH);
    generic_manager_add(VAO_MANAGER, QUAD_MESH.name, square_vao);


    const quadLineMesh = createQuadLineMesh("quadLine", { x: 1, y: 1, z: 0 });
    generic_manager_add(ENGINE.MANAGER.MESH, quadLineMesh.name, quadLineMesh);
    const wire_square_instanced = createInstancedMeshVAO(ENGINE.WEB_GL, quadLineMesh);
    generic_manager_add(VAO_MANAGER, "wire_square_instanced", wire_square_instanced);

    const textures: TextureFile = {
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

    await resourceManager.load_images_and_create_textures(textures);
    await resourceManager.load_shaders_and_compile(shaders);

    // ----------------------------------------------------------------
    material_create_and_link("simple_material", "simple");

    const simple_shader_color_system = simple_material_system("simple");
    generic_manager_add(SHADER_SYSTEM_MANAGER, "simple_material", simple_shader_color_system);

    // ----------------------------------------------------------------


    const advanced_material: Material = {
        name: "advanced_material",
        shaderName: "advanced",

        props: [
            { name: "uColor", type: "color", value: Color.rgba(255, 255, 255, 1) }
        ]
    };

    generic_manager_add(ENGINE.MANAGER.MATERIAL, advanced_material.name, advanced_material);
    const advanced_shader_color_system = advanced_material_system(advanced_material);
    generic_manager_add(SHADER_SYSTEM_MANAGER, advanced_material.name, advanced_shader_color_system);


    const water_material: Material = {
        name: "water_material",
        shaderName: "water",

    };

    const simple_shader_water_system = water_material_system(water_material);
    generic_manager_add(SHADER_SYSTEM_MANAGER, water_material.name, simple_shader_water_system);
    generic_manager_add(ENGINE.MANAGER.MATERIAL, water_material.name, water_material);


}

await LoadResources();

export async function GameMain() {

    const componentState = ENGINE.DEFAULT_COMPONENT_STATE;
    const player = createPlayer(componentState, "player");
    const camera = createCamera(componentState);
    const slime = createSlime(componentState, "slime");

    ECS.System.addSystem(SYSTEM_STATE, SpriteRenderSystem());
    ECS.System.addSystem(SYSTEM_STATE, CharacterControlerSystem());
    ECS.System.addSystem(SYSTEM_STATE, CharacterControllerAnimationSystem());
    ECS.System.addSystem(SYSTEM_STATE, AnimatorSystem(componentState));
    ECS.System.addSystem(SYSTEM_STATE, TerrainSystem(componentState, player));
    ECS.System.addSystem(SYSTEM_STATE, CameraSystem(componentState, camera, player));
    ECS.System.addSystem(SYSTEM_STATE, ColliderSystem(componentState, SYSTEM_STATE));
    ECS.System.addSystem(SYSTEM_STATE, PhysicsSystem(componentState));
    ECS.System.addSystem(SYSTEM_STATE, boxColliderGizmosSystem());
}