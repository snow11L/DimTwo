import type { Vec2 } from "../../../math/vec2/Vec2";
import type { Transform } from "../../transform";
import type { RigidBody2D } from "./RigidBody2DTypes";


export function resolve(
  aTransform: Transform,
  bTransform: Transform,
  aRigid: RigidBody2D,
  bRigid: RigidBody2D,
  resolution: Vec2
) {
  if (aRigid.isStatic && bRigid.isStatic) return;

  const aStatic = aRigid.isStatic ?? true;
  const bStatic = bRigid.isStatic ?? true;

  if (!aStatic && !bStatic) {
    const totalMass = aRigid.mass + bRigid.mass;
    const aFactor = bRigid.mass / totalMass;
    const bFactor = aRigid.mass / totalMass;

    aTransform.position.x += resolution.x * aFactor;
    aTransform.position.y += resolution.y * aFactor;

    bTransform.position.x -= resolution.x * bFactor;
    bTransform.position.y -= resolution.y * bFactor;
  } else if (!aStatic) {
    aTransform.position.x += resolution.x;
    aTransform.position.y += resolution.y;
  } else if (!bStatic) {
    bTransform.position.x -= resolution.x;
    bTransform.position.y -= resolution.y;
  }
}
