import { Input, type System } from "..";
import type { KeyInputState } from "../input/key/types";
import type { MouseInputState } from "../input/mouse/mouse.input.types";


export const globalMouseState: MouseInputState = Input.createMouseInputState();
export const globalKeyState: KeyInputState = Input.createKeyInputState();

Input.attachKeyInputListeners(globalKeyState);
Input.attachMouseInputListeners(globalMouseState);

export function InputSystem(): System {

    return {
        lateUpdate() {

            Input.clearMouseInput(globalMouseState);
            Input.clearKeyInput(globalKeyState);
        },
    }
}