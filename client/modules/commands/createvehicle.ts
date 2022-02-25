import {Game, World, Model} from '@nativewrappers/client'

export default {
    handler: async ([vehicle]: [string]) => {
        const CAR_MODEL = new Model(GetHashKey(vehicle))
        if (!CAR_MODEL.IsInCdImage) return

        const ply = Game.PlayerPed
        const veh = await World.createVehicle(CAR_MODEL, ply.Position, ply.Heading, true)
        if (!veh) return

        ply.setIntoVehicle(veh, -1)
    },
    name: "car",
    description: "spawn a car",
    commandArgs: [
        {name: "model", help: "Model name to spawn"}
    ],
    restricted: false,
    argsRequired: true
}