import { Transform, type CircleCollider2DType } from "../../components";
import type { System } from "../../ecs";
import { get_type } from "../../generators/get_component";
import { Color } from "../../math/color/color";
import { Vec3 } from "../../math/vec3/vec3";
import { ComponentType } from "../../types/component-type";
import { Gizmos } from "./Gizmos";

const rotation = { x: 0, y: 0, z: 0, w: 1 };

export function circleColliderGizmosSystem(): System {
    return {
        onDrawGizmos() {
            const circleColliders = get_type<CircleCollider2DType>(ComponentType.CircleCollider2D);

            for (const boxCollider of circleColliders) {
                const transform = Transform.getTransform(boxCollider.gameEntity);
                if (!transform) continue;

                const pos = { x: 0, y: 0, z: 0 };
                Vec3.add(pos, transform.position, boxCollider.center);

                const size = { x: 0, y: 0, z: 0 }
                Vec3.scale(size, transform.scale, boxCollider.radius);

                const isColliding = boxCollider.isColliding;

                const color = isColliding ? Color.ORANGE : Color.GREEN;
                Gizmos.draw_wire_circle(pos, rotation, size, color);
            }
        },
    }
}