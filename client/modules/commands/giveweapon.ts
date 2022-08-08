import {Game} from '@nativewrappers/client'

export default {
    handler: async ([_weapon]: [string]) => {
        const WEAPON = GetHashKey(_weapon)
        if (!IsWeaponValid(WEAPON)) return

        const ply = Game.PlayerPed
        ply.giveWeapon(WEAPON, 999, false, true)
    },
    name: "giveweapon",
    description: "give yourself a weapon",
    commandArgs: [
        {name: "weapon", help: "Weapon name"}
    ],
    restricted: false,
    argsRequired: true
}