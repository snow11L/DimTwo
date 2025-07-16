import { Color } from "../../../game/systems/procedural-world/biome";
import { get_transform, get_type } from "../../builders/get_component";
import { type BoxColliderComponent } from "../../gears/collider/box/BoxCollider";
import type { System } from "../../gears/ecs/system";
import { ComponentType } from "../../types/component-type";
import { Vec3 } from "../../webgl/vec3";
import { Gizmos } from "./gizmos";

const rotation = { x: 0, y: 0, z: 0, w: 1 };

export function boxColliderGizmosSystem(): System {
    return {
        onDrawGizmos() {
            const boxColliders = get_type<BoxColliderComponent>(ComponentType.BOX_COLLIDER);

            for (const boxCollider of boxColliders) {
                const transform = get_transform(boxCollider.gameEntity);
                if (!transform) continue;

                const pos = { x: 0, y: 0, z: 0 };
                Vec3.add(pos, transform.position, boxCollider.center);

                const size = { x: 0, y: 0, z: 0 }
                Vec3.mult(size, transform.scale, boxCollider.size);

                const isColliding = boxCollider.isColliding;



                const color = isColliding ? Color.orange : Color.green;
                Gizmos.draw_wire_square(pos, rotation, size, color);
            }
        },
    }
}
