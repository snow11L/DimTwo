import { Input } from "../../../api/TwoD";
import type { System } from "../../../TwoD";
import type { KeyInputState } from "../../../TwoD/resources/input/key/key.input.type";
import type { MouseInputState } from "../../../TwoD/resources/input/mouse/mouse.input.types";


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