export interface KeyboardInput {
    getKeyDown(code: string): boolean;
    getKey(code: string): boolean;
    getKeyUp(code: string): boolean;
    clearKeyInput(): void;
}
