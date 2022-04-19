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