import type { ComponentType } from "../../types/component-type";
import type { GameEntity } from "../../types/EngineEntity";
import type { Instantiable } from "../../resources/mesh/mesh";

export interface Component extends Instantiable{
  gameEntity: GameEntity;
  enabled: boolean;
  readonly type: ComponentType;
  readonly category: string;
}

type BaseOmittedKeys = "gameEntity" | "instance" | "type" | "category";
export type ComponentOptions<T extends Component> = Partial<Omit<T, BaseOmittedKeys>>;