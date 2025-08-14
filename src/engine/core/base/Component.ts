import { ComponentGroup, ComponentType } from "../../modules/components/component-type";
import type { GameEntity } from "./GameEntity";
import { Instantiable } from "./Instantiable";

export abstract class Component extends Instantiable {
  private gameEntity: GameEntity | null;
  enabled: boolean;
  readonly type: ComponentType;
  readonly group: ComponentGroup;

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
    type: ComponentType,
    group: ComponentGroup,
    gameEntity: GameEntity | null = null
  ) {
    super();
    this.type = type;
    this.group = group;
    this.gameEntity = gameEntity;
    this.enabled = true;
  }
}
