import './modules'
import {Vec3} from "@nativewrappers/client/lib/utils/Vector3";
import HOSPITAL_SPAWNS from './hospitals.json'
import {Game} from "@nativewrappers/client";

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
    } else {
        const coords = NearestHospital();

        exp['spawnmanager'].spawnPlayer({
            ...coords,
            skipFade: false,
            model: LocalPlayer.state['playerModel']
        })
    }
})