import type { GameEntity } from "../../base/gameEntity/types";

export interface ShaderSystem {
    global?: () => void;
    local?: (gameEntity: GameEntity) => void;
}
