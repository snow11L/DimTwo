import type { Instantiable } from "../resources/mesh/types";
import type { ComponentTypes } from "../types/component-type";
import type { GameEntityType } from "./gameEntity/types";

export interface Component extends Instantiable {
  gameEntity: GameEntityType;
  enabled: boolean;
  readonly type: ComponentTypes;
  readonly category: string;
}

