import PlayerService from './player.service'
import Logger from '../logger'

const exp = global.exports

onNet("test-env:playerLoaded", async () => {
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
          emitNet("test-env:spawnPlayer", src, player.position)
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