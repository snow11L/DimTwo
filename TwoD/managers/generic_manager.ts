export interface GenericManager<K, T> {
    name: string;
    values: Map<K, T>;
}

export function createGenericManager<K, T>(name: string): GenericManager<K, T> {
    return {
        name: name,
        values: new Map<K, T>(),
    };
}

export function generic_manager_set<K, T>(
    manager: GenericManager<K, T>,
    key: K,
    value: T
): void {
    manager.values.set(key, value);
}

export function generic_manager_add<K, T>(
    manager: GenericManager<K, T>,
    key: K,
    value: T
): void {
    if (manager.values.has(key)) {
        console.warn(`Key '${String(key)}' already exists. Skipping registration.`);
        return;
    }
    manager.values.set(key, value);
}

export function generic_manager_get<K, T>(
    manager: GenericManager<K, T>,
    key: K
): T | null {
    const value = manager.values.get(key);
    if (value === undefined) {
        console.warn(`[GenericManager] Key "${String(key)}" not found in manager "${manager.name ?? "unknown"}".`);
        return null;
    }
    return value;
}

export function generic_manager_has<K, T>(
    manager: GenericManager<K, T>,
    key: K
): boolean {
    return manager.values.has(key);
}

export function generic_manager_remove<K, T>(
    manager: GenericManager<K, T>,
    key: K
): void {
    manager.values.delete(key);
}

export function generic_manager_get_all<K, T>(
    manager: GenericManager<K, T>
): T[] {
    return Array.from(manager.values.values());
}
