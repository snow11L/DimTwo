import { get_transform, get_type } from "../../generators/get_component";
import type { CircleColliderComponent } from "../../collider/types/CircleCollider";
import type { System } from "../../components/ecs/system";
import { ComponentType } from "../../types/component-type";
import { Gizmos } from "./gizmos";
import { Color } from "../../math/color/color";
import { Vec3 } from "../../math/vec3/vec3";

const rotation = { x: 0, y: 0, z: 0, w: 1 };

export function boxColliderGizmosSystem(): System {
    return {
        onDrawGizmos() {
            const circleColliders = get_type<CircleColliderComponent>(ComponentType.CircleCollider2D);

            for (const boxCollider of circleColliders) {
                const transform = get_transform(boxCollider.gameEntity);
                if (!transform) continue;

                const pos = { x: 0, y: 0, z: 0 };
                Vec3.add(pos, transform.position, boxCollider.center);

                const size = { x: 0, y: 0, z: 0 }
                Vec3.scale(size, transform.scale, boxCollider.radius);

                const isColliding = boxCollider.isColliding;

                const color = isColliding ? Color.ORANGE : Color.GREEN;
                Gizmos.draw_wire_square(pos, rotation, size, color);
            }
        },
    }
}