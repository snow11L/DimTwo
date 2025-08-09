import type { KeyboardInput } from "../../core/input/KeyboardInput";

export class WebKeyboardInput implements KeyboardInput {
    private readonly key: Map<string, boolean>;
    private readonly keyDown: Map<string, boolean>;
    private readonly keyUp: Map<string, boolean>;

    constructor() {
        this.key = new Map<string, boolean>();
        this.keyDown = new Map<string, boolean>();
        this.keyUp = new Map<string, boolean>();

        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    public handleKeyDown(e: KeyboardEvent): void {
        const code = e.code;
        if (!this.key.get(code)) {
            this.key.set(code, true);
            this.keyDown.set(code, true);
        }
    }

    public handleKeyUp(e: KeyboardEvent): void {
        const code = e.code;
        this.key.set(code, false);
        this.keyUp.set(code, true);
    }

    public clearKeyInput(): void {
        this.keyDown.clear();
        this.keyUp.clear();
    }

    public getButtonState(map: Map<string, boolean>, code: string): boolean {
        const state = map.get(code) ?? false;
        map.delete(code);
        return state;
    }

    public getKeyDown(code: string): boolean {
        return this.getButtonState(this.keyDown, code);
    }

    public getKey(code: string): boolean {
        return this.key.get(code) ?? false;
    }

    public getKeyUp(code: string): boolean {
        return this.getButtonState(this.keyUp, code);
    }
}