import type { System } from "../../../api/resources";
import type { TransformComponent } from "../../../api/types";
import { get_transform } from "../../../core/generators/get_component";
import { vec3_lerp } from "../../../core/math/vec3/vec3";
import Time from "../../../core/time/time";
import type { GameEntity } from "../../../core/types/EngineEntity";

export function CameraSystem(cameraEntity: GameEntity, targetEntity: GameEntity): System {

    let cameraTransform: TransformComponent | null = null;
    let targetTransform: TransformComponent | null = null;

    return {
        start() {
            cameraTransform = get_transform(cameraEntity);
            targetTransform = get_transform(targetEntity);
        },

        update() {
            if (!targetTransform || !cameraTransform) return;
            const target = { ...targetTransform.position };
            target.z = cameraTransform.position.z;
            cameraTransform.position = vec3_lerp(cameraTransform.position, cameraTransform.position, target, 1 * Time.deltaTime);

        },
    };

}