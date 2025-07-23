import type { Vec2 } from "../../../math/vec2/Vec2";
import type { TransformType } from "../../spatial";
import { applyResolution } from "./applyResolution";
import type { RigidBody2DType } from "./types";

export function resolveWithRigidBody(
    aTransform: TransformType,
    bTransform: TransformType,
    aRigid: RigidBody2DType,
    bRigid: RigidBody2DType,
    mtv: Vec2
) {
    const aStatic = !!aRigid.isStatic;
    const bStatic = !!bRigid.isStatic;

    if (aStatic && bStatic) return;

    const aMass = aRigid.mass > 0 ? aRigid.mass : 1;
    const bMass = bRigid.mass > 0 ? bRigid.mass : 1;

    if (!aStatic && !bStatic) {

        const totalMass = aMass + bMass;
        const aMoveFactor = bMass / totalMass;
        const bMoveFactor = aMass / totalMass;

        applyResolution(aTransform, mtv, aMoveFactor);
        applyResolution(bTransform, mtv, -bMoveFactor);
        return;

    }

    if (!aStatic) {
        applyResolution(aTransform, mtv, 1);
        return;

    }

    if (!bStatic) {
        applyResolution(bTransform, mtv, -1);
        return;
    }
}