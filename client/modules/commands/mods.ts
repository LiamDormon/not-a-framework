import {Game, Menu, Point, UIMenuItem, VehicleColor, VehicleModType, VehicleWindowTint} from '@nativewrappers/client'

function splitPascalCase(word: string) {
  return word.match(/($[a-z])|[A-Z][^A-Z]+/g)?.join(" ") || word
}

export default {
  handler: async () => {
    const veh = Game.PlayerPed.CurrentVehicle

    if (veh) {
      veh.Mods.installModKit()

      const mainMenu = new Menu('', 'Upgrades people, upgrades', new Point(0, 0), 'shopui_title_carmod', 'shopui_title_carmod')
      const mods = Object.keys(VehicleModType).map((key) => {
        if (isNaN(Number(key)) ||  ["23", "11", "12", "13", "16", "18"].includes(key)) return

        if (GetNumVehicleMods(veh.Handle, Number(key)) > 0) {
          return veh.Mods.getMod(Number(key))
        }
      })

      mods?.forEach(mod => {
        if(!mod) return;

        const label = splitPascalCase(VehicleModType[mod.ModType])
        const modMenu = new Menu(label, "Stock", new Point(0, 0), 'commonmenu', 'gradient_bgd')

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

      const colourMenu = new Menu('Colours', '', new Point(0, 0), 'commonmenu', 'gradient_bgd')
      const primary = new Menu('Primary', '', new Point(0, 0), 'commonmenu', 'gradient_bgd')
      const secondary = new Menu('Secondary', '', new Point(0, 0), 'commonmenu', 'gradient_bgd')
      const pearlescent = new Menu('Pearlescent', '', new Point(0, 0), 'commonmenu', 'gradient_bgd')
      const dash = new Menu('Dashboard', '', new Point(0, 0), 'commonmenu', 'gradient_bgd')
      const trim = new Menu('Trim', '', new Point(0, 0), 'commonmenu', 'gradient_bgd')

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

      const tints = Object.keys(VehicleWindowTint).map((key) => {
        if (!isNaN(Number(key)) || key == "Stock") return
        return key
      })

      const tintMenu = new Menu('Tints', '', new Point(0, 0), 'commonmenu', 'gradient_bgd')

      tints?.forEach((tint) =>{
        if(!tint) return;
        tintMenu.addItem(new UIMenuItem(splitPascalCase(tint)))
      })

      tintMenu.itemSelect.on((menu, tint) => {
        veh.Mods.WindowTint = tint as number
      })

      mainMenu.addSubMenu(colourMenu, 'Colour')
      mainMenu.addSubMenu(tintMenu, 'Window Tints')

      const upgradeBtn = new UIMenuItem('Upgrade')
      upgradeBtn.activated.on(() => ExecuteCommand("upgrade"))

      const repairBtn = new UIMenuItem('Repair & Clean')
      repairBtn.activated.on(() => ExecuteCommand("fix"))

      mainMenu.addItem(upgradeBtn)
      mainMenu.addItem(repairBtn)

      mainMenu.open()
    }
  },
  name: "mods",
  description: "Mod your vehicle",
  restricted: false,
  argsRequired: false
}