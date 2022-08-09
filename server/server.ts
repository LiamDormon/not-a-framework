import './player/player.controller'

on("onResourceStart", (name: string) => {
    if (name == GetCurrentResourceName()) {
        setTimeout(() => {
            console.log(`^3    
              _              __                                             _    
             | |            / _|                                           | |   
  _ __   ___ | |_    __ _  | |_ _ __ __ _ _ __ ___   _____      _____  _ __| | __
 | '_ \\ / _ \\| __|  / _\` | |  _| '__/ _\` | '_ \` _ \\ / _ \\ \\ /\\ / / _ \\| '__| |/ /
 | | | | (_) | |_  | (_| | | | | | | (_| | | | | | |  __/\\ V  V | (_) | |  |   < 
 |_| |_|\\___/ \\__|  \\__,_| |_| |_|  \\__,_|_| |_| |_|\\___| \\_/\\_/ \\___/|_|  |_|\\_\\    
                                            
               ^0`)
        }, 500)
    }
})

onNet("not-a-framework:setWeather", (weatherType: number) => {
  GlobalState.Weather = weatherType
})

onNet("not-a-framework:setTime", (hh: number, mm: number) => {
  GlobalState.Time = [hh, mm]
})