import type { Mathf } from "../../..";
import type { Component } from "../../../base/Component";
import type { Quat } from "../../../math/quat/quat";



export interface TransformType extends Component {
    position: Mathf.Vec3Type;
    rotation: Quat;
    scale: Mathf.Vec3Type;
}


