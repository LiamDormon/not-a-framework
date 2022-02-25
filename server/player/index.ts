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
      }
    })
})

on("playerDropped", async () => {
    const src = global.source
    Logger.info(`Player disconnected source: ${src}`)
    PlayerService.removePlayer(src)
})