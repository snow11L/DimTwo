import type { RigidBody2DType, TransformType } from "../components";
import { ComponentState, type ComponentStateType, type System } from "../ecs";
import { EngineConfig } from "../global/config/EngineConfig";
import Time from "../time/time";
import { ComponentTypes } from "../types/component-type";

export function PhysicsSystem(componentState: ComponentStateType): System {
    return {
        fixedUpdate() {
            const rigidbodies = ComponentState.getComponentsByCategory<RigidBody2DType>(
                componentState,
                ComponentTypes.RigidBody2D
            );

            for (const rigid of rigidbodies) {
                if (rigid.isStatic) continue;

                const transform = ComponentState.getComponent<TransformType>(
                    componentState,
                    rigid.gameEntity,
                    ComponentTypes.Transform
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
    };
}
