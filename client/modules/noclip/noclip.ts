import {InstructionalButtons, Control, Game, Vector3, Entity} from "@nativewrappers/client";

class _noclip {
    private enabled = false
    private tick = 0
    private entity: Entity | undefined;

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
        if(this.entity) {
          this.entity.Opacity = 255
          this.entity.IsCollisionEnabled = true
        }
    }

    enable() {
        this.enabled = true
        if (Game.PlayerPed.CurrentVehicle) {
          this.entity = Game.PlayerPed.CurrentVehicle
        } else {
          this.entity = Game.PlayerPed
        }

        this.entity.Opacity = 150
        this.entity.IsCollisionEnabled = false

        const emptyVec = new Vector3(0.0, 0.0, 0.0)
        const buttons = new InstructionalButtons([
            {controls: [Control.MoveUpOnly, Control.MoveDownOnly], label: "Forward/Back"},
            {controls: [Control.ContextSecondary, Control.Context], label: "Up/Down"},
            {controls: [Control.Sprint], label: "Speed Up"}
        ])

        this.tick = setTick(async () => {
            await buttons.draw()

            this.entity!.Velocity = emptyVec
            this.entity!.Rotation = emptyVec

            SetEntityHeading(this.entity!.Handle, GetGameplayCamRelativeHeading());

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

            this.entity!.PositionNoOffset = this.entity!.getOffsetPosition(new Vector3(0.0, y * speed, z * speed))
        })
    }
}

export default new _noclip()