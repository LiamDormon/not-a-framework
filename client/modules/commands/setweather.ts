import {Weather} from '@nativewrappers/client'

export default {
  handler: async ([weatherIn]: [string]) => {
    let _weather
    switch (weatherIn) {
      case "blizzard":
        _weather = Weather.Blizzard
        break
      case "christmas":
        _weather = Weather.Christmas
        break
      case "clear":
        _weather = Weather.Clear
        break
      case "clearing":
        _weather = Weather.Clearing
        break
      case "clouds":
        _weather = Weather.Clouds
        break
      case "extrasunny":
        _weather = Weather.ExtraSunny
        break
      case "foggy":
        _weather = Weather.Foggy
        break
      case "halloween":
        _weather = Weather.Halloween
        break
      case "neutral":
        _weather = Weather.Neutral
        break
      case "overcast":
        _weather = Weather.Overcast
        break
      case "raining":
        _weather = Weather.Raining
        break
      case "smog":
        _weather = Weather.Smog
        break
      case "snowing":
        _weather = Weather.Snowing
        break
      case "snowlight":
        _weather = Weather.Snowlight
        break
      case "thunderstorm":
        _weather = Weather.ThunderStorm
        break
      default:
        return emit('chat:addMessage', {
          color: [255, 0, 0],
          args: ['[System]','Invalid weather type']
        });
    }

    emitNet("not-a-framework:setWeather", _weather)
  },
  name: "setweather",
  description: "sets the global weather",
  commandArgs: [
    {name: "weather", help: "Weather"}
  ],
  restricted: false,
  argsRequired: true
}