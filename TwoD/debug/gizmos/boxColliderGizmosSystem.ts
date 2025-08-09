
// import { type BoxCollider2DType, type System, Transform } from "../../core";
// import { ComponentTypes } from "../../core/components/component-type";
// import { get_type } from "../../core/generators/get_component";
// import { Vec3 } from "../../core/math";
// import { Colors } from "../../core/math/color";
// import { Gizmos } from "./Gizmos";
// const rotation = { x: 0, y: 0, z: 0, w: 1 };

// export function boxColliderGizmosSystem(): System {
//     return {
//         onDrawGizmos() {
//             const boxColliders = get_type<BoxCollider2DType>(ComponentTypes.BoxCollider2D);

//             for (const boxCollider of boxColliders) {
//                 const transform = Transform.getTransform(boxCollider.getGameEntity());
//                 if (!transform) continue;

//                 const pos = { x: 0, y: 0, z: 0 };
//                 Vec3.add(pos, transform.position, boxCollider.center);

//                 const size = { x: 0, y: 0, z: 0 }
//                 Vec3.mult(size, transform.scale, boxCollider.size);

//                 const isColliding = boxCollider.isColliding;

//                 const color = isColliding ? Colors.ORANGE : Colors.GREEN;
//                 Gizmos.draw_wire_square(pos, rotation, size, color);
//             }
//         },
//     }
// }
