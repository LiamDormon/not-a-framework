import {Game, Text, Point, Color} from '@nativewrappers/client'

const DRAW_POINT = new Point(50, 50)
const DRAW_TEXT = new Text(
    '{x: 0.0, y: 0.0, z: 0.0}',
    DRAW_POINT,
    0.4,
    Color.white,
)

setTick(() => {
    if (!LocalPlayer.state['showCoords']) return;
    const coords = Game.PlayerPed.Position;
    DRAW_TEXT.caption = `X: ${coords.x}\nY: ${coords.y}\nZ: ${coords.z}\n`
    DRAW_TEXT.draw()
})

export default {
    handler: async () => {
        const plyState = LocalPlayer.state
        const show = !plyState['showCoords']
        plyState.set("showCoords", show, false)
    },
    name: "showcoords",
    description: "draws coordinates to screen",
    restricted: false,
    argsRequired: false
}