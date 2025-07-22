import type { Component } from "../../../base/Component";
import type { Vec2 } from "../../../math/vec2/Vec2";



export interface RigidBody2DType extends Component {
    mass: number;
    velocity: Vec2;
    acceleration: Vec2;
    drag: number;
    gravityScale: number;
    isStatic: boolean;
    useGravity: boolean;
}