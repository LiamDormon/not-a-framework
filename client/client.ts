import './modules'
import {Vec3} from "@nativewrappers/client/lib/utils/Vector3";
import HOSPITAL_SPAWNS from './hospitals.json'
import {Game, Weather, World} from "@nativewrappers/client";

const exp = global.exports
const DEFAULT_SPAWN = {x: 466.8401, y: 197.7201, z: 111.5291}

on("onClientMapStart", () => {
    exp['spawnmanager'].setAutoSpawn(true)
    exp['spawnmanager'].forceRespawn()
})

const NearestHospital = () => {
  const PlyPos = Game.PlayerPed.Position
  let ClosestHospital: Vec3 = {x: 0.0, y: 0.0, z: 0.0}
  let ClosestDist = -1
  HOSPITAL_SPAWNS.forEach(location => {
    const dist = PlyPos.distance(location)

    if (ClosestDist === -1 || dist < ClosestDist) {
      ClosestDist = dist
      ClosestHospital = location
    }
  })

  return ClosestHospital
}

exp["spawnmanager"].setAutoSpawnCallback(() => {
    if (LocalPlayer.state['firstSpawn']) {
        const coords: Vec3 = LocalPlayer.state['spawnCoords'] ?? DEFAULT_SPAWN;

        exp['spawnmanager'].spawnPlayer({
            ...coords,
            skipFade: false,
            model: LocalPlayer.state['playerModel']
        })
        LocalPlayer.state.set("firstSpawn", false, true)

        // override player HP on spawn
        const ply = PlayerPedId()
        SetEntityMaxHealth(ply, 200)
        SetEntityHealth(GetPedMaxHealth(ply), 200)
    } else {
        const coords = NearestHospital();

        exp['spawnmanager'].spawnPlayer({
            ...coords,
            skipFade: false,
            model: LocalPlayer.state['playerModel']
        })

        // override player HP on spawn
        const ply = PlayerPedId()
        SetEntityMaxHealth(ply, 200)
        SetEntityHealth(GetPedMaxHealth(ply), 200)
    }
})

AddStateBagChangeHandler('Time', '', (bagName: string, key: string, value: [string, string]) => {
  const [hh, mm] = value
  NetworkOverrideClockTime(Number(hh), Number(mm), 0)
})

AddStateBagChangeHandler('Weather', '', (bagName: string, key: string, value: Weather) => {
  World.Weather = value
  if (value === Weather.Christmas) {
    SetForceVehicleTrails(true)
    SetForcePedFootstepsTracks(true)
  } else {
    SetForceVehicleTrails(false)
    SetForcePedFootstepsTracks(false)
  }
})