import { Id } from "./Id";

export class Instantiable {
    readonly instanceID: Id;

    constructor() {
        this.instanceID = new Id();
    }
}