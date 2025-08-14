import { Component } from "../../../../core/base/Component";
import type { Vec2 } from "../../../../core/math/Vec2";
import { ComponentType } from "../../component-type";
import type { Transform } from "../../spatial/transform/Transform";

export class RigidBody2D extends Component {
  mass: number;
  velocity: Vec2;
  acceleration: Vec2;
  drag: number;
  gravityScale: number;
  isStatic: boolean;
  useGravity: boolean;

  constructor(
    mass: number = 1,
    velocity: Vec2 = { x: 0, y: 0 },
    acceleration: Vec2 = { x: 0, y: 0 },
    drag: number = 0,
    gravityScale: number = 1,
    isStatic: boolean = false,
    useGravity: boolean = true,
  ) {
    super(ComponentType.RigidBody2D, ComponentType.RigidBody2D);
    this.mass = mass;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.drag = drag;
    this.gravityScale = gravityScale;
    this.isStatic = isStatic;
    this.useGravity = useGravity;
  }


  public static resolveRigidBody(
    aRigid: RigidBody2D | null,
    aTransform: Transform,
    bRigid: RigidBody2D | null,
    bTransform: Transform,
    resolution: Vec2,
  ) {
    if (!aRigid && !bRigid) {
      this.resolveWithoutRigidBody(aTransform, bTransform, resolution);
      return;
    }

    if (aRigid && bRigid) {
      this.resolveWithRigidBody(aTransform, bTransform, aRigid, bRigid, resolution);
      return;
    }
   
  }

  public static applyResolution(transform: Transform, resolution: Vec2, factor: number) {
    transform.position.x += resolution.x * factor;
    transform.position.y += resolution.y * factor;
  }

  public static resolveWithRigidBody(
    aTransform: Transform,
    bTransform: Transform,
    aRigid: RigidBody2D,
    bRigid: RigidBody2D,
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

      this.applyResolution(aTransform, mtv, aMoveFactor);
      this.applyResolution(bTransform, mtv, -bMoveFactor);
      return;
    }

    if (!aStatic) {
      this.applyResolution(aTransform, mtv, 1);
      return;
    }

    if (!bStatic) {
      this.applyResolution(bTransform, mtv, -1);
      return;
    }
  }

  public static resolveWithoutRigidBody(
    aTransform: Transform,
    bTransform: Transform,
    resolution: Vec2,
  ) {
    this.applyResolution(aTransform, resolution, 0.5);
    this.applyResolution(bTransform, resolution, -0.5);
  }
}
