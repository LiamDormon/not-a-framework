import PlayerService from './player.service'
import Logger from '../logger'
import {getPlayerIdentifier} from "../utils";

const exp = global.exports

onNet("playerJoining", async () => {
    const src = global.source
    await PlayerService.playerJoined(src)
})

on("onResourceStart", (name: string) => {
    if (name !== GetCurrentResourceName()) return

    getPlayers()?.forEach(async src => {
        await PlayerService.playerJoined(Number(src))
    })
})

on("onResourceStop", (name: string) => {
    if (name !== GetCurrentResourceName()) return

    getPlayers()?.forEach(async src => {
        await PlayerService.updatePlayerPosition(Number(src))
    })
})

on("onResourceStart", (name: string) => {
  if (name !== "npwd") return;

  getPlayers()?.forEach(async src => {
    const player = PlayerService.getPlayer(parseInt(src))
    if (!player) return;

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
  })
})

on("playerDropped", async () => {
    const src = global.source
    await PlayerService.updatePlayerPosition(src)

    Logger.info(`Player disconnected: ${src}: ${Player.name}`)
    PlayerService.removePlayer(src)
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

AddStateBagChangeHandler("playerModel", "", async (bagName: string, key: string, value: string) => {
    const src = bagName.trim().replace("player:", "")
    await PlayerService.updatePlayerModel(Number(src), value)
})