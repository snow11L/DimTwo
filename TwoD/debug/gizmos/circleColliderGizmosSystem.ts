import { Mathf, Transform, type CircleCollider2DType } from "../..";
import type { System } from "../../ecs";
import { get_type } from "../../generators/get_component";
import { Colors } from "../../math/color/color";

import { ComponentTypes } from "../../types/component-type";
import { Gizmos } from "./Gizmos";

const rotation = { x: 0, y: 0, z: 0, w: 1 };

export function circleColliderGizmosSystem(): System {
    return {
        onDrawGizmos() {
            const circleColliders = get_type<CircleCollider2DType>(ComponentTypes.CircleCollider2D);

            for (const boxCollider of circleColliders) {
                const transform = Transform.getTransform(boxCollider.gameEntity);
                if (!transform) continue;

                const pos = { x: 0, y: 0, z: 0 };
                Mathf.Vec3.add(pos, transform.position, boxCollider.center);

                const size = { x: 0, y: 0, z: 0 }
                Mathf.Vec3.scale(size, transform.scale, boxCollider.radius);

                const isColliding = boxCollider.isColliding;

                const color = isColliding ? Colors.ORANGE : Colors.GREEN;
                Gizmos.draw_wire_circle(pos, rotation, size, color);
            }
        },
    }
}