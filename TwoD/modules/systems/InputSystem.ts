import type { System } from "../../core/ecs/System";
import { InputManager } from "../../core/input/Input";

export function InputSystem(): System {

    return {
        lateUpdate() {

            InputManager.keyboard.clearKeyInput();
            InputManager.mouse.clearMouseInput();
        },
    }
}