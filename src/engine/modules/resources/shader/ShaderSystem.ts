import type { GameEntity } from "../../../core/base/GameEntity";
import type { Scene } from "../../../core/scene/scene";
import type { Engine } from "../../../Engine";
import type { Shader } from "./Shader";

export class ShaderSystem {
    global?(engine: Engine, scene: Scene, shader: Shader): void;
    local?(engine: Engine, entity: GameEntity, scene: Scene, shader: Shader): void;
}
