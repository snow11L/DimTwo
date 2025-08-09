import type { CollisionEvent, TriggerEvent } from "../types/collision-event";
import type { System } from "./systemState/System";

export class ECSSystem {

    private readonly systems: System[] = [];
    
    public addSystem(system: System): void {
   
        this.systems.push(system);
    }

    public callStart(): void {
        for (const system of this.systems) {
            system.start?.();
        }
    }

    public callFixedUpdate(): void {
        for (const system of this.systems) {
            system.fixedUpdate?.();
        }
    }

    public callUpdate(): void {
        for (const system of this.systems) {
            system.update?.();
        }
    }

    public callLateUpdate(): void {
        for (const system of this.systems) {
            system.lateUpdate?.();
        }
    }

    public callRender(): void {
        for (const system of this.systems) {
            system.render?.();
        }
    }

    public callDrawGizmos(): void {
        for (const system of this.systems) {
            system.onDrawGizmos?.();
        }
    }

    public callCollisionEnterEvents(event: CollisionEvent): void {
        for (const system of this.systems) {
            system.onCollisionEnter?.(event);
        }
    }

    public callCollisionStayEvents(event: CollisionEvent): void {
        for (const system of this.systems) {
            system.onCollisionStay?.(event);
        }
    }

    public callCollisionExitEvents(event: CollisionEvent): void {
        for (const system of this.systems) {
            system.onCollisionExit?.(event);
        }
    }

    public callTriggerEnterEvents(event: TriggerEvent): void {
        for (const system of this.systems) {
            system.onTriggerEnter?.(event);
        }
    }

    public callTriggerStayEvents(event: TriggerEvent): void {
        for (const system of this.systems) {
            system.onTriggerStay?.(event);
        }
    }

    public callTriggerExitEvents(event: TriggerEvent): void {
        for (const system of this.systems) {
            system.onTriggerExit?.(event);
        }
    }
}
