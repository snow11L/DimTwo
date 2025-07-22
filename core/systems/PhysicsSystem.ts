import { ECS } from "../../api/TwoD";
import type { RigidBody2D } from "../components/physics/rigidBody2D/RigidBody2DTypes";
import type { Transform } from "../components/transform";
import { ENGINE_CONFIG } from "../config/engine.config";
import type { ECSComponentState } from "../resources/ecs/component";
import type { System } from "../resources/ecs/system";
import Time from "../time/time";
import { ComponentType } from "../types/component-type";

export function PhysicsSystem(componentState: ECSComponentState): System {
    return {
        fixedUpdate() {
            const rigidbodies = ECS.Component.getComponentsByCategory<RigidBody2D>(
                componentState,
                ComponentType.RigidBody2D
            );

            for (const rigid of rigidbodies) {
                if (rigid.isStatic) continue;

                const transform = ECS.Component.getComponent<Transform>(
                    componentState,
                    rigid.gameEntity,
                    ComponentType.Transform
                );

                if (!transform) continue;

                if (rigid.useGravity) {
                    rigid.velocity.x += ENGINE_CONFIG.PHYSICS.gravity.x * Time.fixedDeltaTime;
                    rigid.velocity.y += ENGINE_CONFIG.PHYSICS.gravity.y * Time.fixedDeltaTime;
                }
     
                const decay = Math.exp(-rigid.drag * Time.fixedDeltaTime);
                rigid.velocity.x *= decay;
                rigid.velocity.y *= decay;

                transform.position.x -= rigid.velocity.x * Time.fixedDeltaTime;
                transform.position.y += rigid.velocity.y * Time.fixedDeltaTime;
            }
        }
    };
}
