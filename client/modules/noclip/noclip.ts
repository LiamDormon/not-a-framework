import {InstructionalButtons, Control, Game, Vector3} from "@nativewrappers/client";

class _noclip {
    private enabled = false
    private tick = 0

    toggle() {
        if (!this.enabled) {
            this.enable()
        } else {
            this.disable()
        }
    }

    disable() {
        this.enabled = false
        clearTick(this.tick)
        const ply = Game.PlayerPed
        ply.Opacity = 255
        SetEntityCollision(ply.Handle, true, true)
    }

    enable() {
        this.enabled = true
        const ply = Game.PlayerPed

        ply.Opacity = 150
        SetEntityCollision(ply.Handle, false, false)

        const emptyVec = new Vector3(0.0, 0.0, 0.0)
        const buttons = new InstructionalButtons([
            {controls: [Control.MoveUpOnly, Control.MoveDownOnly], label: "Forward/Back"},
            {controls: [Control.ContextSecondary, Control.Context], label: "Up/Down"},
            {controls: [Control.Sprint], label: "Speed Up"}
        ])

        this.tick = setTick(async () => {
            buttons.draw()

            ply.Velocity = emptyVec
            ply.Rotation = emptyVec

            SetEntityHeading(ply.Handle, GetGameplayCamRelativeHeading());

            const speed = IsControlPressed(0, Control.Sprint) ? 5.0 : 1.0

            let z = 0.0;
            let y = 0.0;

            if (IsControlPressed(0, Control.MoveUpOnly)) {
                y = 0.5
            }
            if (IsControlPressed(0, Control.MoveDownOnly)) {
                y = -0.5
            }

            if (IsControlPressed(0, Control.ContextSecondary)) {
                z = 0.5
            }
            if (IsControlPressed(0, Control.Context)) {
                z = -0.5
            }

            ply.PositionNoOffset = ply.getOffsetPosition(new Vector3(0.0, y * speed, z * speed))
        })
    }
}

export default new _noclip()