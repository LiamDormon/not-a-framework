import {Player} from "./player.class";
import {PlayerDb, _playerDb} from "./player.db"
import {getPlayerLicense} from "../utils";

const exp = global.exports

export class _playerService {
    private playersBySource: Map<number, Player>
    private db: _playerDb

    constructor() {
        this.playersBySource = new Map<number, Player>()
        this.db = PlayerDb
    }

    addPlayer(source: number, player: Player): void {
        this.playersBySource.set(source, player)
    }

    getPlayer(source: number): Player | undefined {
        return this.playersBySource.get(source)
    }

    removePlayer(source: number): void {
        this.playersBySource.delete(source)
    }

    async updatePlayer(player: Player) {
        await this.db.update(player)
    }

    async playerJoined(source: number): Promise<Player | undefined> {
        const identifier = getPlayerLicense(source)
        if (!identifier) return;

        let player: Player


        const [exists, result] = await this.db.getPlayer(identifier)
        if (!exists) {
            const number = await exp.npwd.generatePhoneNumber()
            player = new Player({
                name: GetPlayerName(source.toString()),
                source,
                identifier,
                phone_number: number,
                position: {x: 0.0, y: 0.0, z: 0.0}
            })
            this.db.createPlayer(player)
        } else {
            const {name, phone_number, position} = result!
            player = new Player({
                name,
                identifier,
                source,
                phone_number,
                position: JSON.parse(position)
            })
        }

        await this.addPlayer(source, player)
        return player
    }
}

export default new _playerService()