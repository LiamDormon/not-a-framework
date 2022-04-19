import PlayerService from './player.service'
import Logger from '../logger'
import {getPlayerIdentifier} from "../utils";

const exp = global.exports

onNet("playerJoining", async () => {
    const src = global.source
    PlayerService.playerJoined(src).then(player => {
      if (player) {
          Logger.info(`Loaded new player ${src}:${player.name}`)
          Logger.debug(player)
          exp.npwd.newPlayer({
              source: player.source,
              identifier: player.identifier,
              phoneNumber: player.phone_number
          })

          const PlayerState = Player(src).state
          PlayerState.set("firstSpawn", true, true)
          PlayerState.set("spawnCoords", player.position, true)
      }
    })
})

on("playerDropped", async () => {
    const src = global.source
    const Player = PlayerService.getPlayer(src)
    if (!Player) {
        PlayerService.removePlayer(src)
        return
    }

    Logger.info(`Player disconnected: ${src}: ${Player.name}`)

    const [x, y, z] = GetEntityCoords(GetPlayerPed(src.toString()))
    Logger.debug(`Player[${src}] coords: [${x}, ${y}. ${z}]`)

    Player.position = {x, y, z}
    PlayerService.updatePlayer(Player).then(() => {
        PlayerService.removePlayer(src)
    })
})

interface IDeferral {
    defer: () => void;
    update: (message: string) => void;
    presentCard: (card: unknown, cb: (data: unknown, rawData: string) => void) => void;
    done: (reason?: string) => void;
}

on("playerConnecting", (name: string, setKickReason: (msg: string) => void, deferrals: IDeferral) => {
    const src = global.source;
    deferrals.defer()
    deferrals.update(`Hello ${name}, checking identifiers`)

    setTimeout(async () => {
        const identifier = await getPlayerIdentifier(src, 'fivem')
        if (!identifier) {
            return deferrals.done("Could not find cfx.re identifier")
        }

        deferrals.done()
    }, 500)
})