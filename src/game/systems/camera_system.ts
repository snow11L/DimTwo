import { Transform } from "../../../TwoD/components/spatial/transform/Transform";
import { type System } from "../../../TwoD/core";
import type { GameEntity } from "../../../TwoD/core/base/GameObject";
import { Vec3 } from "../../../TwoD/core/math/vec3/ Vec3";
import Time from "../../../TwoD/core/time/time";

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