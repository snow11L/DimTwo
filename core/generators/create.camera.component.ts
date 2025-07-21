import { generic_manager_add } from "../managers/generic_manager";
import { ComponentType } from "../types/component-type";
import type { GameEntity } from "../types/EngineEntity";
import { createIncrementalId } from "./create.incremental.id";
import { mat4_identity, mat4_create_projection } from "../math/mat4/mat4";
import { ENGINE } from "../../api/engine.manager";
import type { CameraComponent } from "../components/camera";

export function createCameraComponent(gameEntity: GameEntity) {
    const camera: CameraComponent = {
        category: ComponentType.Camera,
        gameEntity: gameEntity,
        instanceID: createIncrementalId(),
        type: ComponentType.Camera,
        enabled: true,
        aspec: 1,
        near: 0.01,
        far: 100,
        fov: 90
    };


    const identity = mat4_identity();
    mat4_create_projection(
        identity,
        camera.fov,
        window.innerWidth / window.innerHeight,
        camera.near,
        camera.far
    );

    generic_manager_add(ENGINE.MANAGER.MAT4, camera.instanceID, identity);

    return camera;

}
