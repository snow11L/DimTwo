import type { Engine } from "../../Engine";
import type { Scene } from "../scene/scene";
import type { CollisionEvent, TriggerEvent } from "../types/collision-event";

export class System {
  private scene: Scene | null = null;
  private engine: Engine | null = null;


  public setScene(scene: Scene) {
    this.scene = scene;
  }

  public getScene(): Scene {
    if (!this.scene) {
      throw new Error("System not connected to any scene");
    }
    return this.scene;
  }

  public getEngine(): Engine {
    if (!this.engine) {
      throw new Error(`System ${this.constructor.name} not connected to any engine`);
    }
    return this.engine;
  }

  public setEngine(engine: Engine) {
    this.engine = engine;
  }



  start?(): void;
  update?(): void;
  fixedUpdate?(): void;
  lateUpdate?(): void;
  render?(): void;
  onDrawGizmos?(): void;


  onCollisionEnter?(collisionEvent: CollisionEvent): void;
  onCollisionStay?(collisionEvent: CollisionEvent): void;
  onCollisionExit?(collisionEvent: CollisionEvent): void;


  onTriggerEnter?(triggerEvent: TriggerEvent): void;
  onTriggerStay?(triggerEvent: TriggerEvent): void;
  onTriggerExit?(triggerEvent: TriggerEvent): void;
}
