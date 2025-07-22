import { Transform, type System, type TransformType } from "../../../TwoD";
import type { GameEntityType } from "../../../TwoD/base/gameEntity/types";
import { vec3_lerp } from "../../../TwoD/math/vec3/functions";
import Time from "../../../TwoD/time/time";

export function CameraSystem(cameraEntity: GameEntityType, targetEntity: GameEntityType): System {

    let cameraTransform: TransformType | null = null;
    let targetTransform: TransformType | null = null;

    return {
        start() {
            cameraTransform = Transform.getTransform(cameraEntity);
            targetTransform = Transform.getTransform(targetEntity);
        },

        update() {

        
            if (!targetTransform || !cameraTransform) return;
            const target = { ...targetTransform.position };
            target.z = cameraTransform.position.z;
             
            cameraTransform.position = vec3_lerp(cameraTransform.position, cameraTransform.position, target, 1 * Time.deltaTime);

        },
    };

}