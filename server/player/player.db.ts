import {Player} from "./player.class"
import {PlayerDbResult} from "./player.interface";

const exp = global.exports

export class _playerDb {
    createPlayer(player: Player) {
        exp.oxmysql.insert(
            "INSERT INTO users (identifier, name, phone_number, position) VALUES (?, ?, ?, ?)",
            [player.identifier, player.name, player.phone_number, JSON.stringify(player.position)]
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
        console.log(player)
        await exp.oxmysql.update_async(
            "UPDATE users SET x = :x, y = :y, z = :z, model = :model WHERE identifier = :iden ",
            {
                x: player.position.x,
                y: player.position.y,
                z: player.position.z,
                model: player.model,
                iden: player.identifier
            }
        )
    }
}

export const PlayerDb = new _playerDb()