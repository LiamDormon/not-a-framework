import NoClip from './noclip'

RegisterCommand("noclip", () => {
    NoClip.toggle()
}, false)

RegisterKeyMapping('noclip', 'Toggle Noclip', 'keyboard', 'f2')