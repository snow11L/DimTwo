export class SparseSet<K, T> {
    private dense: T[] = [];
    private entityToIndex: Map<K, number> = new Map();
    private indexToEntity: Map<number, K> = new Map();

    add(entity: K, component: T): void {
        if (this.entityToIndex.has(entity)) {
            const index = this.entityToIndex.get(entity)!;
            this.dense[index] = component;
        } else {
            const index = this.dense.length;
            this.dense.push(component);
            this.entityToIndex.set(entity, index);
            this.indexToEntity.set(index, entity);
        }
    }

    get(entity: K): T | null {
        const index = this.entityToIndex.get(entity);
        if (index === undefined) return null;
        return this.dense[index];
    }

    has(entity: K): boolean {
        return this.entityToIndex.has(entity);
    }

    remove(entity: K): boolean {
        const index = this.entityToIndex.get(entity);
        if (index === undefined) return false;

        const lastIndex = this.dense.length - 1;

        if (index !== lastIndex) {
            this.dense[index] = this.dense[lastIndex];

            const lastEntity = this.indexToEntity.get(lastIndex)!;
            this.entityToIndex.set(lastEntity, index);
            this.indexToEntity.set(index, lastEntity);
        }

        this.dense.pop();
        this.entityToIndex.delete(entity);
        this.indexToEntity.delete(lastIndex);

        return true;
    }

    *iterate(): IterableIterator<T> {
        for (const component of this.dense) {
            yield component;
        }
    }

    get size(): number {
        return this.dense.length;
    }
}

