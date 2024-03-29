import VehicleCommand from './createvehicle'
import WeaponCommand from './giveweapon'
import DeleteVehicle from './deletevehicle'
import TeleportMarker from './teleportmarket'
import TeleportCoords from './teleportcoord'
import FixVehicle from './fixvehicle'
import './showcoords'
import ShowCoords from './showcoords'
import SetModel from './setmodel'
import SetTime from './settime'
import SetWeather from './setweather'
import Upgrade from './upgrade'
import Mods from './mods'

interface CommandArgs {
    name: string;
    help: string;
}

interface Command {
    name: string;
    description: string;
    commandArgs?: CommandArgs[];
    handler: (params: any) => void;
    restricted: boolean;
    argsRequired: boolean;
}

export const CreateCommand = (command: Command) => {
    const {name, description, commandArgs, handler, restricted, argsRequired} = command

    RegisterCommand(name, (source: number, args?: string[]) => {
        if (args && commandArgs && argsRequired) {
            if (args.length !== commandArgs.length) {
                return emit('chat:addMessage', {
                    color: [255, 0, 0],
                    multiline: true,
                    args: ['System', 'Please fill in all arguments']
                });
            }
        }

        handler(args)

    }, restricted)
    emit("chat:addSuggestion", `/${name}`, description, commandArgs)
}

CreateCommand(WeaponCommand)
CreateCommand(VehicleCommand)
CreateCommand(DeleteVehicle)
CreateCommand(TeleportMarker)
CreateCommand(FixVehicle)
CreateCommand(ShowCoords)
CreateCommand(SetModel)
CreateCommand(SetTime)
CreateCommand(SetWeather)
CreateCommand(Upgrade)
CreateCommand(Mods)
CreateCommand(TeleportCoords)