import {Game} from '@nativewrappers/client'

export default {
    handler: async () => {
        const ply = Game.PlayerPed
        const veh = ply.CurrentVehicle
        if (veh) {
            veh.delete()
        }
    },
    name: "dv",
    description: "deletes the car you are sitting in",
    restricted: false,
    argsRequired: false
}