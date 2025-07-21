import type { Component, ComponentOptions } from "../component/component";
import type { Vec3 } from "../../math/vec3/vec3";
import type { Quat } from "../../math/quat/quat";

export type TransformOptions = ComponentOptions<TransformComponent>;

export interface TransformComponent extends Component {
    position: Vec3;
    rotation: Quat;
    scale: Vec3;
}


