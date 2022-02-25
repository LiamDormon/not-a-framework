import VehicleCommand from './createvehicle'
import WeaponCommand from './giveweapon'
import DeleteVehicle from './deletevehicle'
import TeleportMarker from './teleportmarket'

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