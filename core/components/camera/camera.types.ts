import type { Component } from "../component/component.types";

export interface CameraComponent extends Component {
  near: number;
  far: number;
  fov: number;
  aspec: number;
}