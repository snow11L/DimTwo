import type { GameEntity } from "../../../core/base/GameEntity";
import type { Scene } from "../../../core/scene/scene";
import type { Shader } from "./Shader";


export class ShaderSystem {
    global?(scene: Scene, shader: Shader): void;
    local?(entity: GameEntity, scene: Scene, shader: Shader): void;
}
