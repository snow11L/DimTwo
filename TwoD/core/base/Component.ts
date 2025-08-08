import type { ComponentTypes } from "../components/component-type";
import type { GameEntity } from "./GameObject";
import { Instantiable } from "./Instantiable";

export class Component  extends Instantiable {
  gameEntity: GameEntity | null;
  enabled: boolean;
  readonly type: ComponentTypes;
  readonly category: string;

  constructor(
    type: ComponentTypes,
    category: string,
    gameEntity: GameEntity | null = null
  ) {
    super();
    this.type = type;
    this.category = category;
    this.gameEntity = gameEntity;
    this.enabled = true;
  }
}
