import type { MouseInput } from "../../core/input/MouseInput";
import { Vec2 } from "../../core/math/vec2/Vec2";

export class WebMouseInput implements MouseInput {
    private readonly button: Map<number, boolean>;
    private readonly buttonDown: Map<number, boolean>;
    private readonly buttonUp: Map<number, boolean>;
    private position: Vec2;
    private movement: Vec2;
    private scrollDelta: Vec2;
    private scrollCallback: ((delta: Vec2) => void) | null;

    constructor() {
        this.button = new Map();
        this.buttonDown = new Map();
        this.buttonUp = new Map();

        this.position = new Vec2(0, 0);
        this.movement = new Vec2(0, 0);
        this.scrollDelta = new Vec2(0, 0);

        this.scrollCallback = null;

        document.addEventListener('mousedown', (e) => this.handleButtonDown(e));
        document.addEventListener('mouseup', (e) => this.handleButtonUp(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('wheel', (e) => this.handleScroll(e));
    }


    private handleButtonDown(e: MouseEvent): void {
        if (!this.button.get(e.button)) {
            this.button.set(e.button, true);
            this.buttonDown.set(e.button, true);
        }
    }

    private handleButtonUp(e: MouseEvent): void {
        this.button.set(e.button, false);
        this.buttonUp.set(e.button, true);
    }

    private handleMouseMove(e: MouseEvent): void {
        this.position = { x: e.clientX, y: e.clientY };
        this.movement = { x: e.movementX, y: e.movementY };
    }

    private handleScroll(e: WheelEvent): void {
        this.scrollDelta = { x: e.deltaX, y: e.deltaY };
        if (this.scrollCallback) {
            this.scrollCallback(this.scrollDelta);
        }
    }

    public clearMouseInput(): void {
        this.buttonDown.clear();
        this.buttonUp.clear();
        this.movement = { x: 0, y: 0 };
        this.scrollDelta = { x: 0, y: 0 };
    }

    public getMouseButtonDown(button: number): boolean {
        return this.buttonDown.get(button) ?? false;
    }

    public getMouseButton(button: number): boolean {
        return this.button.get(button) ?? false;
    }

    public getMouseButtonUp(button: number): boolean {
        return this.buttonUp.get(button) ?? false;
    }

    public getMousePosition(): Vec2 {
        return this.position;
    }

    public getMouseMovement(): Vec2 {
        return this.movement;
    }

    public getScrollDelta(): Vec2 {
        return this.scrollDelta;
    }

    public onMouseScroll(callback: (delta: Vec2) => void): void {
        this.scrollCallback = callback;
    }
}