import { System } from "../../core/base/System";
import Time from "../../core/time/Time";
import { EngineConfig } from "../../global/config/EngineConfig";
import type { RigidBody2D } from "../components/physics/RigidBody2D";
import type { Transform } from "../components/spatial/Transform";
import { ComponentGroup, ComponentType } from "../enums/ComponentType";

export class PhysicsSystem extends System {
    fixedUpdate() {

        const scene = this.getScene();
        const components = scene.components;

        const rigidbodies = components.getAllByGroup<RigidBody2D>(
            ComponentGroup.RigidBody2D
        );

        for (const rigid of rigidbodies) {
            if (rigid.isStatic) continue;

            const transform = components.getComponent<Transform>(
                rigid.getGameEntity(),
                ComponentType.Transform
            );

            if (!transform) continue;

            if (rigid.useGravity) {
                rigid.velocity.x += EngineConfig.PHYSICS.gravity.x * Time.fixedDeltaTime;
                rigid.velocity.y += EngineConfig.PHYSICS.gravity.y * Time.fixedDeltaTime;
            }

            const decay = Math.exp(-rigid.drag * Time.fixedDeltaTime);
            rigid.velocity.x *= decay;
            rigid.velocity.y *= decay;

            transform.position.x -= rigid.velocity.x * Time.fixedDeltaTime;
            transform.position.y += rigid.velocity.y * Time.fixedDeltaTime;
        }
    }
}
