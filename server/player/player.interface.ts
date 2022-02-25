export interface PlayerProps {
    name: string;
    identifier: string;
    source: number;
    phone_number: string;
    position: Vector;
}

export interface PlayerDbResult {
    name: string;
    identifier: string;
    phone_number: string;
    position: string;
}