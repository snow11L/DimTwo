import type { GameEntity } from "../../engine/core/base/GameEntity";
import type { System } from "../../engine/core/ecs/System";
import { Vec3 } from "../../engine/core/math/vec3/ Vec3";
import Time from "../../engine/core/time/time";
import { Transform } from "../../engine/modules/components/spatial/transform/Transform";

export function CameraSystem(cameraEntity: GameEntity, targetEntity: GameEntity): System {

    let cameraTransform: Transform | null = null;
    let targetTransform: Transform | null = null;

    return {
        start() {
            cameraTransform = Transform.getTransform(cameraEntity);
            targetTransform = Transform.getTransform(targetEntity);
        },

        update() {

        
            if (!targetTransform || !cameraTransform) return;
            const target = { ...targetTransform.position };
            target.z = cameraTransform.position.z;
             
            cameraTransform.position = Vec3.lerp(cameraTransform.position, cameraTransform.position, target, 1 * Time.deltaTime);

        },
    };

}