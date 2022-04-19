import {Game, Model} from '@nativewrappers/client'

export default {
    handler: async ([model]: [string]) => {
        const PedModel = new Model(GetHashKey(model))
        if (!PedModel.IsInCdImage || !PedModel.IsPed) return
        await PedModel.request(100)

        SetPlayerModel(Game.Player.Handle, PedModel.Hash)
        PedModel.markAsNoLongerNeeded()
        LocalPlayer.state.set("playerModel", PedModel.Hash, true)
    },
    name: "setmodel",
    description: "sets your player model",
    commandArgs: [
        {name: "model", help: "Player Model"}
    ],
    restricted: false,
    argsRequired: true
}