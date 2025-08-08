import { TransformLib, type System, type TransformType } from "../../../TwoD/core";
import type { GameEntity } from "../../../TwoD/core/base/GameObject";
import { Vec3 } from "../../../TwoD/core/math/vec3/ Vec3";
import Time from "../../../TwoD/core/time/time";

export function CameraSystem(cameraEntity: GameEntity, targetEntity: GameEntity): System {

    let cameraTransform: TransformType | null = null;
    let targetTransform: TransformType | null = null;

    return {
        start() {
            cameraTransform = TransformLib.getTransform(cameraEntity);
            targetTransform = TransformLib.getTransform(targetEntity);
        },

        update() {

        
            if (!targetTransform || !cameraTransform) return;
            const target = { ...targetTransform.position };
            target.z = cameraTransform.position.z;
             
            cameraTransform.position = Vec3.lerp(cameraTransform.position, cameraTransform.position, target, 1 * Time.deltaTime);

        },
    };

}