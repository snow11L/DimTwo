import type { Vec2 } from "../../../math/vec2/Vec2";
import type { Component, ComponentOptions } from "../../types";

export type RigidBodyOptions = ComponentOptions<RigidBody2D>;

export interface RigidBody2D extends Component {
    mass: number;
    velocity: Vec2;
    acceleration: Vec2;
    drag: number;
    gravityScale: number;
    isStatic: boolean;
    useGravity: boolean;
}