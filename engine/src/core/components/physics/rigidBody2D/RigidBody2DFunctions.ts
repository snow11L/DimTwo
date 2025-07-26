import type { Vec2 } from "../../../math/vec2/Vec2";
import type { TransformType } from "../../spatial";
import { resolveWithoutRigidBody } from "./resolveWithoutRigidBody";
import { resolveWithRigidBody } from "./resolveWithRigidBody";
import type { RigidBody2DType } from "./types";

export function resolveRigidBody(
  aRigid: RigidBody2DType,
  aTransform: TransformType,
  bRigid: RigidBody2DType,
  bTransform: TransformType,
  resolution: Vec2,
) {

  if (!aRigid && !bRigid) {
    resolveWithoutRigidBody(aTransform, bTransform, resolution);
    return;
  }

  if (aRigid && bRigid) {
    resolveWithRigidBody(aTransform, bTransform, aRigid, bRigid, resolution);
    return;
  }
}

