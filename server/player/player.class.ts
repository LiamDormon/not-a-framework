import {PlayerProps} from "./player.interface";

export class Player {
    name: string;
    source: number;
    identifier: string;
    phone_number: string;

    constructor({name, source, identifier, phone_number}: PlayerProps) {
        this.name = name;
        this.source = source;
        this.identifier = identifier;
        this.phone_number = phone_number;
    }
}