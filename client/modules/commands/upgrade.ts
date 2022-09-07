import {Game, VehicleModType, VehicleToggleModType} from '@nativewrappers/client'

export default {
  handler: async () => {
    const ply = Game.PlayerPed
    const veh = ply.CurrentVehicle
    if (veh) {
      veh.repair()
      veh.wash()

      veh.Mods.getMod(VehicleModType.Engine)!.Index = 3
      veh.Mods.getMod(VehicleModType.Brakes)!.Index = 2
      veh.Mods.getMod(VehicleModType.Transmission)!.Index = 2
      veh.Mods.getMod(VehicleModType.Armor)!.Index = 4

      veh.Mods.getToggleMod(VehicleToggleModType.Turbo)!.IsInstalled = true
      SetVehicleTurboPressure(veh.Handle, 100)
    }
  },
  name: "upgrade",
  description: "Upgrade your vehicle",
  restricted: false,
  argsRequired: false
}