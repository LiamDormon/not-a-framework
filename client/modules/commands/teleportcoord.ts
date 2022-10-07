import {Game, Vector3, Wait} from "@nativewrappers/client";
import playerService from "../../../server/player/player.service";

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
  async handler([_x, _y, _z]: [string, string, string]) {
    if (!_x || !_y || !_z) {
      return emit("chat:addMessage", {
        color: [255, 0, 0],
        multiline: true,
        args: ['System', 'Please enter x, y and z coordinates']
      })
    }

    const x = Number(_x.replace(",", "")) + 0.0
    const y = Number(_y.replace(",", "")) + 0.0
    const z = Number(_z.replace(",", "")) + 0.0

    const ped = Game.PlayerPed

    RequestCollisionAtCoord(x, y, z)
    await Wait(100)
    SetEntityCoords(ped.Handle, x + 0.0, y + 0.0, z + 0.0, false, false, false, false)
  },
  name: "tp",
  description: "teleport to coords",
  restricted: false,
  argsRequired: false,
  commandArgs: [
    {name: "x", help: "X Coordinate"},
    {name: "y", help: "Y Coordinate"},
    {name: "z", help: "Z Coordinate"}
  ]
}