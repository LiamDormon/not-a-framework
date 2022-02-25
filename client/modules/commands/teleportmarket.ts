import {Game, Wait} from "@nativewrappers/client";

function FindZAtCoord(x: number, y: number) {
    let found = true
    const START_Z = 1500
    let z = START_Z
    while (found && z > 0) {
        const [success, _z] = GetGroundZFor_3dCoord(x, y, z - 1.0, false)
        if (success) {
            z = _z
        }
        found = success
    }

    if (z == START_Z) return null
    return z
}

export default {
    async handler() {
        const waypoint = GetFirstBlipInfoId(GetWaypointBlipEnumId())
        if (!waypoint || waypoint < 0) {
            return emit("chat:addMessage", {
                color: [255, 0, 0],
                multiline: true,
                args: ['System', 'No waypoint found']
            })
        }

        const [x, y] = GetBlipInfoIdCoord(waypoint)
        const ped = Game.PlayerPed
        SetPedCoordsKeepVehicle(ped.Handle, x, y, 100.0)
        const veh = ped.CurrentVehicle
        if (veh) {
            veh.IsPositionFrozen = true
        } else {
            ped.IsPositionFrozen = true
        }
        while (IsEntityWaitingForWorldCollision(ped.Handle)) {
            await Wait(100)
        }

        for (let i = 0; i < 5; i++) {
            const z = FindZAtCoord(x, y)
            if (z) {
                SetPedCoordsKeepVehicle(ped.Handle, x, y, z)
                break
            } else {
                await Wait(500)
            }
        }

        if (veh) {
            veh.IsPositionFrozen = false
        } else {
            ped.IsPositionFrozen = false
        }
    },
    name: "tpm",
    description: "teleport to market",
    restricted: false,
    argsRequired: false
}