import type { System } from "../../../../engine/core/ecs/System";
import { InputSystem } from "../../../../engine/interfaces/Input";
import { WebKeyboardInput } from "../../../../engine/modules/webInput/WebKeyboardInput";
import { WebMouseInput } from "../../../../engine/modules/webInput/WebMouseInput";

export const Input = new InputSystem(new WebKeyboardInput(), new WebMouseInput());

export function InputSystemComponent(): System {
     return {
        start() {
            Input.enable();
        },

        lateUpdate() {
            Input.clear();
        }
     }
}