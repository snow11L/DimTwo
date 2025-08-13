import type { GameEntity } from "../../../core/base/GameEntity";


export interface ShaderSystem {
    global?: () => void;
    local?: (gameEntity: GameEntity) => void;
}
