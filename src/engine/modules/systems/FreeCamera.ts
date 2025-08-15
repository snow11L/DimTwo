import { System } from "../../core/base/System";
import { Vec3 } from "../../core/math/Vec3";
import type { Scene } from "../../core/scene/scene";
import { Camera } from "../components/render/Camera";
import type { Transform } from "../components/spatial/Transform";
import { ComponentType } from "../enums/ComponentType";
import { WebKeyboardInput } from "../webInput/WebKeyboardInput";
import type { KeyCode } from "../webInput/WebKeyCode";

class Input {
    private static keyInput: WebKeyboardInput = new WebKeyboardInput();

    public static getKey(keyCode: KeyCode) {
        return this.keyInput.getKey(keyCode);
    }

    public static enable() {
        this.keyInput.enable();
    }

    public static clear() {
        this.keyInput.clear();
    }
}

export class FreeCameraSystem extends System {
    private camera: Camera | null = null;
    private moveSpeed = 5;

    start(): void {
        const scene: Scene = this.getScene();
        this.camera = scene.getActiveCamera();
        Input.enable();
    }

    update(dt: number): void {
        if (!this.camera) return;
        const components = this.getScene().components;

        const transform = components.getComponent<Transform>(this.camera.getGameEntity(), ComponentType.Transform)
        if (!transform) return;

        const moveDir = new Vec3(0, 0, 0);

        if (Input.getKey("KeyW")) moveDir.y += 1;
        if (Input.getKey("KeyS")) moveDir.y -= 1;
        if (Input.getKey("KeyA")) moveDir.x -= 1;
        if (Input.getKey("KeyD")) moveDir.x += 1;


        if (moveDir.x || moveDir.y) {
            Vec3.normalize(moveDir, moveDir);
            Vec3.scale(moveDir, moveDir, this.moveSpeed * dt);
            Vec3.add(transform.position, moveDir, transform.position);
        }
    }

    lateUpdate(dt: number): void {
        Input.clear();
    }
}
