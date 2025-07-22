import type { Instantiable } from "../resources/mesh/mesh";
import type { ComponentType } from "../types/component-type";
import type { GameEntityType } from "./GameEntity";

export interface Component extends Instantiable {
  gameEntity: GameEntityType;
  enabled: boolean;
  readonly type: ComponentType;
  readonly category: string;
}

type BaseOmittedKeys = "gameEntity" | "instance" | "type" | "category";
export type ComponentOptions<T extends Component> = Partial<Omit<T, BaseOmittedKeys>>;