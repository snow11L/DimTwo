import type { GameEntity } from "../../base/GameEntity";


export interface ShaderSystem {
    global?: () => void;
    local?: (gameEntity: GameEntity) => void;
}
