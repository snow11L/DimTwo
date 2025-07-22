import { Transform, type BoxCollider2DType } from "../../components";
import type { System } from "../../ecs";
import { get_type } from "../../generators/get_component";
import { Vec3 } from "../../math";
import { Colors } from "../../math/color/color";
import { ComponentType } from "../../types/component-type";
import { Gizmos } from "./Gizmos";

const rotation = { x: 0, y: 0, z: 0, w: 1 };

export function boxColliderGizmosSystem(): System {
    return {
        onDrawGizmos() {
            const boxColliders = get_type<BoxCollider2DType>(ComponentType.BoxCollider2D);

            for (const boxCollider of boxColliders) {
                const transform = Transform.getTransform(boxCollider.gameEntity);
                if (!transform) continue;

                const pos = { x: 0, y: 0, z: 0 };
                Vec3.add(pos, transform.position, boxCollider.center);

                const size = { x: 0, y: 0, z: 0 }
                Vec3.mult(size, transform.scale, boxCollider.size);

                const isColliding = boxCollider.isColliding;

                const color = isColliding ? Colors.ORANGE : Colors.GREEN;
                Gizmos.draw_wire_square(pos, rotation, size, color);
            }
        },
    }
}
