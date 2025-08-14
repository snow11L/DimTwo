import { System } from "../../engine/core/base/System";
import { Vec3 } from "../../engine/core/math/Vec3";
import Time from "../../engine/core/time/time";
import { ComponentType } from "../../engine/modules/components/component-type";
import { Transform } from "../../engine/modules/components/spatial/transform/Transform";

export class CameraSystem extends System {

    private cameraTransform: Transform | null = null;
    private targetTransform: Transform | null = null;

    start() {

        const cameraEntity = this.getScene().entities.getByTag("MainCamera");
        if (!cameraEntity) return;

        const playerEntity = this.getScene().entities.getByTag("Player");
        if (!playerEntity) return;

        this.cameraTransform = this.getScene().components.getComponent<Transform>(cameraEntity, ComponentType.Transform);
        this.targetTransform = this.getScene().components.getComponent<Transform>(playerEntity, ComponentType.Transform);
    }

    update() {


        if (!this.targetTransform || !this.cameraTransform) return;
        const target = { ...this.targetTransform.position };
        target.z = this.cameraTransform.position.z;

        this.cameraTransform.position = Vec3.lerp(this.cameraTransform.position, this.cameraTransform.position, target, 1 * Time.deltaTime);

    }
}