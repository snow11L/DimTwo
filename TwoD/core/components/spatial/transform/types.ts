import type { Component } from "../../../base/Component";
import type { Quat } from "../../../math/quat/quat";

export interface TransformType extends Component {
    position: Vec3;
    rotation: Quat;
    scale: Vec3;
}


