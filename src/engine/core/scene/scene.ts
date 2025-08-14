import type { Engine } from "../../Engine";
import { ResourcesManager } from "../../global/manager/manager";
import { ComponentGroup, type ComponentType } from "../../modules/components/component-type";
import { Mesh } from "../../modules/resources/mesh/Mesh";
import type { Component } from "../base/Component";
import type { GameEntity } from "../base/GameEntity";
import { Render } from "../base/Render";
import type { System } from "../ecs/System";
import { Global } from "../managers/engine.manager";
import { GenericManager } from "../managers/generic_manager";
import { EngineSystem, EngineSystemManager } from "../managers/SystemManager";
import type { CollisionEvent, TriggerEvent } from "../types/collision-event";


export interface IComponentManager {
    addComponent(entity: GameEntity, component: Component): boolean;
    removeComponent(entity: GameEntity, type: ComponentType): boolean;
    getComponent<T extends Component>(entity: GameEntity, type: ComponentType): T | null;
    getAllComponents<T extends Component>(entity: GameEntity, type: ComponentType): T[];
    getAllOfType<T extends Component>(type: ComponentType): T[];

}

export class ComponentManager implements IComponentManager {
    private readonly data: Map<ComponentType, Map<number, Component>> = new Map();
    private readonly group: Map<ComponentGroup, Set<Component>> = new Map();

    addComponent(entity: GameEntity, component: Component): boolean {

        const type = component.type;
        if (!this.data.has(type)) this.data.set(type, new Map());

        const typeMap = this.data.get(type)!;
        if (typeMap.has(entity.id.getValue())) {
            console.warn(`GameEntity ${entity.id.getValue()} already has a component of type ${type}`);
            return false;
        }

        typeMap.set(entity.id.getValue(), component);

        // Adiciona ao grupo se o componente tiver um
        const group = component.group;
        if (group) {
            if (!this.group.has(group)) this.group.set(group, new Set());
            this.group.get(group)!.add(component);
        }

        component.setGameEntity(entity);
        return true;
    }

    removeComponent(entity: GameEntity, type: ComponentType): boolean {
        const typeMap = this.data.get(type);
        if (!typeMap || !typeMap.has(entity.id.getValue())) return false;

        const component = typeMap.get(entity.id.getValue())!;
        typeMap.delete(entity.id.getValue());

        // Remove do grupo
        const group = component.group;
        if (group && this.group.has(group)) {
            this.group.get(group)!.delete(component);
        }

        return true;
    }

    getComponent<T extends Component>(entity: GameEntity, type: ComponentType): T | null {
        const typeMap = this.data.get(type);
        return (typeMap?.get(entity.id.getValue()) as T) ?? null;
    }

    getAllComponents<T extends Component>(entity: GameEntity, type: ComponentType): T[] {
        const comp = this.getComponent<T>(entity, type);
        return comp ? [comp] : [];
    }

    getAllOfType<T extends Component>(type: ComponentType): T[] {
        const typeMap = this.data.get(type);
        return typeMap ? Array.from(typeMap.values()) as T[] : [];
    }

    getAllByGroup<T extends Component>(group: ComponentGroup): T[] {
        return Array.from(this.group.get(group) ?? []) as T[];
    }
}

export class SystemManager {
    private readonly data: Map<EngineSystem, System> = new Map();

    public addSystem(systemType: EngineSystem, systemInstance: System): void {
        if (this.data.has(systemType)) {
            console.warn(`System ${EngineSystem[systemType]} já está registrado.`);
            return;
        }
        this.data.set(systemType, systemInstance);
    }

    public getSystem<T extends System>(systemType: EngineSystem): T | null {
        return (this.data.get(systemType) as T) ?? null;
    }

    public hasSystem(systemType: EngineSystem): boolean {
        return this.data.has(systemType);
    }


    public callStart(): void {
        for (const system of this.data.values()) system.start?.();
    }
    public callFixedUpdate(): void {
        for (const system of this.data.values()) system.fixedUpdate?.();
    }
    public callUpdate(): void {
        for (const system of this.data.values()) system.update?.();
    }
    public callLateUpdate(): void {
        for (const system of this.data.values()) system.lateUpdate?.();
    }
    public callRender(): void {
        for (const system of this.data.values()) system.render?.();
    }
    public callDrawGizmos(): void {
        for (const system of this.data.values()) system.onDrawGizmos?.();
    }


    public callCollisionEnterEvents(event: CollisionEvent): void {
        for (const system of this.data.values()) system.onCollisionEnter?.(event);
    }
    public callCollisionStayEvents(event: CollisionEvent): void {
        for (const system of this.data.values()) system.onCollisionStay?.(event);
    }
    public callCollisionExitEvents(event: CollisionEvent): void {
        for (const system of this.data.values()) system.onCollisionExit?.(event);
    }


    public callTriggerEnterEvents(event: TriggerEvent): void {
        for (const system of this.data.values()) system.onTriggerEnter?.(event);
    }
    public callTriggerStayEvents(event: TriggerEvent): void {
        for (const system of this.data.values()) system.onTriggerStay?.(event);
    }
    public callTriggerExitEvents(event: TriggerEvent): void {
        for (const system of this.data.values()) system.onTriggerExit?.(event);
    }
}

export class Scene {
    public name: string;
    public components: ComponentManager = new ComponentManager();
    public systems: SystemManager = new SystemManager();
    public usedSystems: EngineSystem[] = [];

    // Apenas IDs que a cena usa
    private sceneMat4IDs: Set<number> = new Set();
    private sceneVAOIDs: Set<number> = new Set();

    private engine: Engine | null = null;
    public getEngine() {
        return this.engine;
    }

    public setEngine(engine: Engine) {
        this.engine = engine;
    }



    public readonly entitiesById: GenericManager<number, GameEntity>;
    public readonly entitiesByName: GenericManager<string, GameEntity>;

    constructor(name: string) {
        this.name = name;
        this.entitiesById = new GenericManager("EntitiesByIdManager");
        this.entitiesByName = new GenericManager("EntitiesManager");
    }

    public addEntity(entity: GameEntity) {
        for (const component of entity.components) {
            this.components.addComponent(entity, component);
        }
    }

    public useSystem(systemType: EngineSystem) {
        this.usedSystems.push(systemType);
    }

    public load() {
        if (!this.engine) throw new Error("Engine not set for this scene.");

        // Inicializa sistemas
        for (const system of this.usedSystems) {
            let systemInstance = this.systems.getSystem(system);
            if (systemInstance) return systemInstance;

            systemInstance = EngineSystemManager.create(system);
            if (!systemInstance) throw new Error(`System ${EngineSystem[system]} could not be created`);

            systemInstance.setScene(this);
            systemInstance.setEngine(this.engine);
            this.systems.addSystem(system, systemInstance);
        }

        // Coleta renderers
        const renderers = this.components.getAllByGroup<Render>(ComponentGroup.Render);
        const meshes: Set<Mesh> = new Set<Mesh>();

        for (const render of renderers) {
            const mesh = ResourcesManager.MeshManager.get(render.meshID);
            if (mesh) meshes.add(mesh);
        }

        // Cria VAOs na engine e registra IDs usados nesta cena
        for (const mesh of meshes) {
            const vao = mesh.createMeshVAO(Global.WebGL);
            this.engine.vao.values.set(mesh.instanceID.getValue(), vao);
            this.sceneVAOIDs.add(mesh.instanceID.getValue());
        }
    }

    public releaseResources() {
        if (!this.engine) return;

        for (const id of this.sceneVAOIDs) {
            this.engine.vao.values.delete(id);
        }
        this.sceneVAOIDs.clear();
        this.sceneMat4IDs.clear();
    }

}