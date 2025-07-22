import { ECS } from "../../api/TwoD";
import type { ECSComponentState } from "../resources/ecs/component";
import type { System } from "../resources/ecs/system";
import type { TransformComponent } from "../components/transform";
import type { RigidBodyComponent } from "../components/rigid-body-2d/RigidBody2D";
import { ComponentType } from "../types/component-type";
import Time from "../time/time";
import { ENGINE_CONFIG } from "../config/engine.config";

export function PhysicsSystem(componentState: ECSComponentState): System {
    return {
        fixedUpdate() {
            const rigidbodies = ECS.Component.getComponentsByCategory<RigidBodyComponent>(
                componentState,
                ComponentType.RigidBody
            );

            for (const rigid of rigidbodies) {
                if (rigid.isStatic) continue;

                const transform = ECS.Component.getComponent<TransformComponent>(
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
