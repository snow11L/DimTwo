import type { Component, ComponentOptions } from "../../base/Component";
import type { Quat } from "../../math/quat/quat";
import type { Vec3 } from "../../math/vec3/vec3";

export type TransformOptions = ComponentOptions<Transform>;

export interface Transform extends Component {
    position: Vec3;
    rotation: Quat;
    scale: Vec3;
}


