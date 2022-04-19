export interface PlayerProps {
    name: string;
    identifier: string;
    source: number;
    phone_number: string;
    position: Vector;
    model: string;
}

export interface PlayerDbResult {
    name: string;
    identifier: string;
    phone_number: string;
    x: number;
    y: number;
    z: number;
    model: string;
}