import './modules'
import {Vec3} from "@nativewrappers/client/lib/utils/Vector3";
import {Fading, Game, Vector3} from "@nativewrappers/client";

const exp = global.exports

const interval = setTick(async () => {
  if (NetworkIsSessionActive()) {
    clearTick(interval)
    await Fading.fadeOut(500)
    exp.spawnmanager.setAutoSpawn(false)
    emitNet("test-env:playerLoaded")
  }
},)

onNet("test-env:spawnPlayer",(position: Vec3) => {
  setTimeout(async () => {
    Game.PlayerPed.Position = Vector3.create(position)
    await Fading.fadeIn(500)
  }, 1000)
})
