import type { ComponentTypes } from "../components/component-type";
import type { Instantiable } from "../resources/mesh/types";
import type { GameEntityType } from "./gameEntity/types";

export interface Component extends Instantiable {
  gameEntity: GameEntityType;
  enabled: boolean;
  readonly type: ComponentTypes;
  readonly category: string;
}

