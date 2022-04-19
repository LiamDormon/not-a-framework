import {PlayerProps} from "./player.interface";

export class _Player {
    name: string;
    source: number;
    identifier: string;
    phone_number: string;
    position: Vector;
    model: string;

    constructor({name, source, identifier, phone_number, position, model}: PlayerProps) {
        this.name = name;
        this.source = source;
        this.identifier = identifier;
        this.phone_number = phone_number;
        this.position = position;
        this.model = model;
    }
}