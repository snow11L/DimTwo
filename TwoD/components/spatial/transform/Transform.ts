import { Component } from "../../../core/base/Component";
import type { GameEntity } from "../../../core/base/GameEntity";
import { Quat } from "../../../core/math/quat/quat";
import { Vec3 } from "../../../core/math/vec3/ Vec3";
import { Scene } from "../../../core/resources/scene/scene";
import { ComponentTypes } from "../../component-type";

export class Transform extends Component {
    position: Vec3;
    rotation: Quat;
    scale: Vec3;

    constructor(
        position: Vec3 = new Vec3(0, 0, 0),
        rotation: Quat = new Quat(0, 0, 0, 1),
        scale: Vec3 = new Vec3(1.0, 1.0, 1.0)
    ) {
        super(ComponentTypes.Transform, ComponentTypes.Transform);
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    public static getTransform(gameEntity: GameEntity): Transform | null {
        const scene = Scene.getCurrentScene();

        return scene.ECSComponents.getComponent<Transform>(
            gameEntity,
            ComponentTypes.Transform
        );
    }
}


