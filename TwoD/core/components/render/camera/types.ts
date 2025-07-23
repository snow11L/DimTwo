import type { Component } from "../../../base/Component";

export interface CameraType extends Component {
  near: number;
  far: number;
  fov: number;
  aspec: number;
}