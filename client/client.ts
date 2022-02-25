const interval = setInterval(() => {
  if (NetworkIsSessionActive()) {
    global.exports.spawnmanager.spawnPlayer({
      x: 466.8401,
      y: 197.7201,
      z: 111.5291,
      heading: 291.71,
      model: 'a_m_m_farmer_01',
      skipFade: false
    }, function() {
      emitNet("test-env:playerLoaded")
      clearInterval(interval)
    })
  }
}, 1000)
