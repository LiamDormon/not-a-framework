import {Game} from '@nativewrappers/client'

export default {
    handler: async () => {
        const ply = Game.PlayerPed
        const veh = ply.CurrentVehicle
        if (veh) {
            veh.BodyHealth = 1000
            veh.EngineHealth = 1000

            veh.repair()
            veh.wash()
        }
    },
    name: "fix",
    description: "fix a vehicle",
    restricted: false,
    argsRequired: false
}