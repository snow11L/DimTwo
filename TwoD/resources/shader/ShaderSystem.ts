import type { GameEntityType } from "../../base/gameEntity/types";

export interface ShaderSystem {
    global?: () => void;
    local?: (gameEntity: GameEntityType) => void;
}
