import { Component } from "../../../../core/base/Component";
import { Mat4 } from "../../../../core/math/Mat4";
import { Quat } from "../../../../core/math/quat";
import { Vec3 } from "../../../../core/math/Vec3";
import { ComponentGroup, ComponentType } from "../../component-type";

export class Transform extends Component {
    position: Vec3;
    rotation: Quat;
    scale: Vec3;
    public modelMatrix = new Mat4();

    constructor(
        position: Vec3 = new Vec3(0, 0, 0),
        rotation: Quat = new Quat(0, 0, 0, 1),
        scale: Vec3 = new Vec3(1.0, 1.0, 1.0)
    ) {
        super(ComponentType.Transform, ComponentGroup.Transform);
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}


