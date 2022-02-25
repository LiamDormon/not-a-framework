import {Player} from "./player.class"
import {PlayerDbResult} from "./player.interface";
import Logger from "../logger"

const exp = global.exports

export class _playerDb {
    createPlayer(player: Player) {
        exp.oxmysql.insert(
            "INSERT INTO users (identifier, name, phone_number, position) VALUES (?, ?, ?, ?)",
            [player.identifier, player.name, player.phone_number, player.position]
        )
    }

    async getPlayer(identifier: string): Promise<[boolean, PlayerDbResult | undefined]> {
        const results = await exp.oxmysql.query_async(
            "SELECT * FROM users WHERE identifier = ?",
            [identifier]
        )

        const result = <PlayerDbResult[]>results
        if (!result || result.length < 1) {
            return [false, undefined]
        } else {
            return [true, result[0]]
        }
    }

    async update(player: Player) {
        await exp.oxmysql.update_async(
            "UPDATE users SET position = ? WHERE identifier = ? ",
            [JSON.stringify(player.position), player.identifier]
        )
    }
}

export const PlayerDb = new _playerDb()