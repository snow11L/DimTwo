import { ComponentTypes } from "../../modules/components/component-type";
import type { GameEntity } from "./GameEntity";
import { Instantiable } from "./Instantiable";

export abstract class Component extends Instantiable {
  private gameEntity: GameEntity | null;
  enabled: boolean;
  readonly type: ComponentTypes;
  readonly category: string;

  public getGameEntity(): GameEntity {

    if (!this.gameEntity) {
      throw new Error("game entity nao atribuida");
    }
    return this.gameEntity;
  }


  public setGameEntity(gameEntity: GameEntity): void {
    this.gameEntity = gameEntity;
  }

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
