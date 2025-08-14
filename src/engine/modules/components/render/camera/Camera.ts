import { Component } from "../../../../core/base/Component";
import { Color } from "../../../../core/math/Color";
import { Mat4 } from "../../../../core/math/Mat4";
import { ComponentGroup, ComponentType } from "../../component-type";

export class Camera extends Component {
  near: number;
  far: number;
  fov: number;
  aspect: number;
  clearColor: Color;

  public viewMatrix: Mat4 = Mat4.create();
  public projection: Mat4 = Mat4.create();

  constructor(
    near: number = 0.1,
    far: number = 1000,
    fov: number = 60,
    aspect: number = 16 / 9
  ) {
    super(ComponentType.Camera, ComponentGroup.Camera);
    this.near = near;
    this.far = far;
    this.fov = fov;
    this.aspect = aspect;
    this.clearColor = Color.gray;
  }

}
