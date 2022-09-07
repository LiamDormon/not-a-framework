import {Game, Menu, UIMenuItem, VehicleColor, VehicleModType} from '@nativewrappers/client'

interface IModLabels {
  [key: number]: string
}

const wordSplitRegex = new RegExp(/($[a-z])|[A-Z][^A-Z]+/g)

function splitPascalCase(word: string) {
  return word.match(wordSplitRegex)?.join(" ") || word
}

export default {
  handler: async () => {
    const ply = Game.PlayerPed
    const veh = ply.CurrentVehicle

    if (veh) {
      veh.Mods.installModKit()

      const mainMenu = new Menu('LS Customs', '')
      const mods = Object.keys(VehicleModType).map((key) => {
        if (isNaN(Number(key)) ||  ["23", "11", "12", "13", "16", "18"].includes(key)) return

        if (GetNumVehicleMods(veh.Handle, Number(key)) > 0) {
          return veh.Mods.getMod(Number(key))
        }
      })

      mods?.forEach(mod => {
        if(!mod) return;

        const label = splitPascalCase(VehicleModType[mod.ModType])
        const modMenu = new Menu(label, "Stock")

        for (let i = 0; i < mod.ModCount; i++) {
          const menuItem = new UIMenuItem(GetLabelText(GetModTextLabel(veh.Handle, mod.ModType, i)))
          modMenu.addItem(menuItem)
        }

        const stock = new UIMenuItem("Stock")

        stock.activated.on(() => {
          veh.Mods.getMod(mod.ModType)!.Index = -1
          modMenu.Subtitle = "Stock"
        })

        modMenu.addItem(stock)

        modMenu.itemSelect.on((menu, item) => {
          const modIndex = item as number
          veh.Mods.getMod(mod.ModType)!.Index = modIndex
          modMenu.Subtitle = GetLabelText(GetModTextLabel(veh.Handle, mod.ModType, modIndex))
        })

        mainMenu.addSubMenu(modMenu, label)
      })

      const colours = Object.keys(VehicleColor).map((key) => {
        if (!isNaN(Number(key))) return
        return key
      })

      const colourMenu = new Menu('Colours', '')
      const primary = new Menu('Primary', '')
      const secondary = new Menu('Secondary', '')
      const pearlescent = new Menu('Pearlescent', '')
      const dash = new Menu('Dashboard', '')
      const trim = new Menu('Trim', '')

      colours.forEach((colour, index) => {
        if(!colour) return

        const menuItem = new UIMenuItem(splitPascalCase(colour))
        primary.addItem(menuItem)
        secondary.addItem(menuItem)
        pearlescent.addItem(menuItem)
        dash.addItem(menuItem)
        trim.addItem(menuItem)
      })

      primary.itemSelect.on((menu, item) => {
        veh.Mods.PrimaryColor = item as number
      })

      secondary.itemSelect.on((menu, item) => {
        veh.Mods.SecondaryColor = item as number
      })

      pearlescent.itemSelect.on((menu, item) => {
        veh.Mods.PearlescentColor = item as number
      })

      trim.itemSelect.on((menu, item) => {
        veh.Mods.TrimColor = item as number
      })

      dash.itemSelect.on((menu, item) => {
        veh.Mods.DashboardColor = item as number
      })

      colourMenu.addSubMenu(primary, 'Primary')
      colourMenu.addSubMenu(secondary, 'Secondary')
      colourMenu.addSubMenu(pearlescent, 'Pearlescent')
      colourMenu.addSubMenu(dash, 'Dashboard')
      colourMenu.addSubMenu(trim, 'Trim')
      mainMenu.addSubMenu(colourMenu, 'Colour')

      mainMenu.open()
    }
  },
  name: "mods",
  description: "Mod your vehicle",
  restricted: false,
  argsRequired: false
}