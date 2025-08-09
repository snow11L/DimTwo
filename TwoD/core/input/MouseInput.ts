import type { Vec2 } from "../math/vec2/Vec2";

export interface MouseInput {
    getMouseButtonDown(button: number): boolean;
    getMouseButton(button: number): boolean;
    getMouseButtonUp(button: number): boolean;
    getMousePosition(): Vec2;
    getMouseMovement(): Vec2;
    getScrollDelta(): Vec2;
    clearMouseInput(): void;
    onMouseScroll(callback: (delta: Vec2) => void): void;
}