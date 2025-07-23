import { type CircleCollider2DType, Mathf, type System, Transform } from "../../core";
import { ComponentTypes } from "../../core/components/component-type";
import { get_type } from "../../core/generators/get_component";
import { Colors } from "../../core/math/color";
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