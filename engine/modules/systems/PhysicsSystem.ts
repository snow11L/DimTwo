import type { System } from "../../core/ecs/System";
import { SceneManager } from "../../core/scene/SceneManager";
import Time from "../../core/time/time";
import { EngineConfig } from "../../global/config/EngineConfig";
import { ComponentTypes } from "../components/component-type";
import type { RigidBody2D } from "../components/physics/rigidBody2D/RigidBody";
import type { Transform } from "../components/spatial/transform/Transform";

export function PhysicsSystem(): System {
    return {
        
        fixedUpdate() {

            const scene = SceneManager.getCurrentScene();
            const components = scene.ECSComponents;

            const rigidbodies = components.getComponentsByCategory<RigidBody2D>(
                ComponentTypes.RigidBody2D
            );

            for (const rigid of rigidbodies) {
                if (rigid.isStatic) continue;

                const transform = components.getComponent<Transform>(
                    rigid.getGameEntity(),
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
