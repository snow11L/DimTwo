import type { GameEntityType } from "../../base/GameEntity";

export interface ShaderSystem {
    global?: () => void;
    local?: (gameEntity: GameEntityType) => void;
}
