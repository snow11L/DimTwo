import type { Component } from "../../../base/Component";

export interface CameraComponent extends Component {
  near: number;
  far: number;
  fov: number;
  aspec: number;
}