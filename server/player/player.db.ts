import {_Player} from "./player.class"
import {PlayerDbResult} from "./player.interface";
import {oxmysql} from "@overextended/oxmysql";

export class _playerDb {
    createPlayer(player: _Player) {
      oxmysql.insert(
            "INSERT INTO users (identifier, name, phone_number, position, x, y, z, model) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [player.identifier, player.name, player.phone_number, player.position.x, player.position.y, player.position.z, player.model]
      )
    }

    async getPlayer(identifier: string): Promise<[boolean, PlayerDbResult | undefined]> {
        const results = await oxmysql.query(
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

    async update(player: _Player) {
        console.log(player)
        await oxmysql.update(
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