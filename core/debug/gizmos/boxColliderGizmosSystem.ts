import { type BoxCollider2D } from "../../components/physics/boxCollider2D/BoxCollider2DTypes";
import { get_transform, get_type } from "../../generators/get_component";
import { Color } from "../../math/color/color";
import { Vec3 } from "../../math/vec3/vec3";
import type { System } from "../../resources/ecs/system";
import { ComponentType } from "../../types/component-type";
import { Gizmos } from "./gizmos";

const rotation = { x: 0, y: 0, z: 0, w: 1 };

export function boxColliderGizmosSystem(): System {
    return {
        onDrawGizmos() {
            const boxColliders = get_type<BoxCollider2D>(ComponentType.BoxCollider2D);

            for (const boxCollider of boxColliders) {
                const transform = get_transform(boxCollider.gameEntity);
                if (!transform) continue;

                const pos = { x: 0, y: 0, z: 0 };
                Vec3.add(pos, transform.position, boxCollider.center);

                const size = { x: 0, y: 0, z: 0 }
                Vec3.mult(size, transform.scale, boxCollider.size);

                const isColliding = boxCollider.isColliding;

                const color = isColliding ? Color.ORANGE : Color.GREEN;
                Gizmos.draw_wire_square(pos, rotation, size, color);
            }
        },
    }
}
