import { Component } from "../../../../core/base/Component";
import { get_category } from "../../../generators/get_component";
import { ComponentTypes } from "../../component-type";

export class Camera extends Component {
  near: number;
  far: number;
  fov: number;
  aspect: number;

  constructor(
    near: number = 0.1,
    far: number = 1000,
    fov: number = 60,
    aspect: number = 16 / 9
  ) {
    super(ComponentTypes.Camera, ComponentTypes.Camera);
    this.near = near;
    this.far = far;
    this.fov = fov;
    this.aspect = aspect;
  }

 public static getActivedCamera(): Camera | null {
    const cameras = get_category<Camera>(ComponentTypes.Camera);
    if (cameras.length === 0) return null;
    return cameras[0];
}
}
