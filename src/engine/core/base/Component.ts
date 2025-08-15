import { ComponentGroup, ComponentType } from "../../modules/enums/ComponentType";
import type { GameEntity } from "./GameEntity";
import { Instantiable } from "./Instantiable";

export interface Clonable<T> {
  clone(): T;
}

export abstract class Component extends Instantiable implements Clonable<Component> {
  private gameEntity: GameEntity | null;
  enabled: boolean;
  readonly type: ComponentType;
  readonly group: ComponentGroup;

  public getGameEntity(): GameEntity {
    if (!this.gameEntity) {
      throw new Error("game entity não atribuída");
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

 clone(): Component {
  throw new Error(`Subclasse ${this.type} deve implementar clone() retornando uma nova instância`);
}
}
