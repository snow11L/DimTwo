import { Id } from "./Id";

export class Entity {
    readonly id: Id;

    constructor() {
        this.id = new Id();
    }
}

