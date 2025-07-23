import type { Component } from "../base/Component";
import type { AnimatorType, BoxCollider2DType, CircleCollider2DType, RigidBody2DType, SpriteRenderType, TransformType } from "../components";

type BaseOmittedKeys = "gameEntity" | "instance" | "type" | "category";
export type ComponentOptions<T extends Component> = Partial<Omit<T, BaseOmittedKeys>>;

export type AnimatorOptions = ComponentOptions<AnimatorType>;
export type BoxColliderOptions = ComponentOptions<BoxCollider2DType>;
export type RigidBodyOptions = ComponentOptions<RigidBody2DType>;
export type SpriteRenderOptions = ComponentOptions<SpriteRenderType>;
export type TransformOptions = ComponentOptions<TransformType>;
export type CircleColliderOptions = ComponentOptions<CircleCollider2DType>;
