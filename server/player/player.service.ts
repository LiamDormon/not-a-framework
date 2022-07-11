import {_Player} from "./player.class";
import {PlayerDb, _playerDb} from "./player.db"
import {getPlayerIdentifier} from "../utils";
import Logger from '../logger'

const exp = global.exports

export class _playerService {
    private playersBySource: Map<number, _Player>
    private db: _playerDb

    constructor() {
        this.playersBySource = new Map<number, _Player>()
        this.db = PlayerDb
    }

    addPlayer(source: number, player: _Player): void {
        this.playersBySource.set(source, player)
    }

    getPlayer(source: number): _Player | undefined {
        return this.playersBySource.get(source)
    }

    removePlayer(source: number): void {
        this.playersBySource.delete(source)
    }

    async updatePlayer(player: _Player) {
        await this.db.update(player)
    }

    async playerJoined(source: number): Promise<_Player | undefined> {
        const identifier = await getPlayerIdentifier(source, "fivem")
        if (!identifier) return;

        let player: _Player

        const [exists, result] = await this.db.getPlayer(identifier)
        if (!exists) {
            const number = await exp.npwd.generatePhoneNumber()
            player = new _Player({
                name: GetPlayerName(source.toString()),
                source,
                identifier,
                phone_number: number,
                position: {x: 0.0, y: 0.0, z: 0.0},
                model: "a_m_y_hipster_02"
            })
            this.db.createPlayer(player)
        } else {
            const {name, phone_number, x, y, z, model} = result!
            player = new _Player({
                name,
                identifier,
                source,
                phone_number,
                position: {x, y, z},
                model
            })
        }

        try {
          exp.npwd.newPlayer({
            source: player.source,
            identifier: player.identifier,
            phoneNumber: player.phone_number,
            firstname: player.name
          })
        } catch (e) {
          Logger.error("Missing newPlayer export in NPWD")
        }

        const PlayerState = Player(source).state
        PlayerState.set("firstSpawn", true, true)
        PlayerState.set("spawnCoords", player.position, true)
        PlayerState.set("playerModel", player.model, true)

        Logger.info(`Loaded new player ${player.source}:${player.name}`)
        Logger.debug(player)

        await this.addPlayer(source, player)
        return player
    }

    async updatePlayerPosition(source: number) {
        const player = this.getPlayer(source)
        if (!player) return;

        const [x, y, z] = GetEntityCoords(GetPlayerPed(source.toString()))

        player.position = {x, y, z}
        await this.updatePlayer(player)

        Logger.info(`Updated position for player [${source}] coords: [${x}, ${y}. ${z}]`)
    }

    async updatePlayerModel(source: number, model: string) {
        const player = this.getPlayer(source)
        Logger.debug(player)

        if (!player) return
        player.model = model;
        await this.db.update(player)

        Logger.info(`Updated player model for Player [${source}] to ${model}`)
    }
}

export default new _playerService()