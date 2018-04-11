module.exports = mobile

function mobile (state, emitter) {
  var body = document.body
  var timeout
  var ended
  var lastTap = 0
  body.addEventListener('touchstart', function (event) {
    ended = false
    setTimeout(function () {
      if (!ended) {
        emitter.emit('hold')
      }
    }, 600)
  })
  body.addEventListener('touchend', function (event) {
    ended = true
    var currentTime = new Date().getTime()
    var tapLength = currentTime - lastTap
    clearTimeout(timeout)
    if (tapLength < 500 && tapLength > 0) {
        emitter.emit('doubletap')
        event.preventDefault()
    } else {
      emitter.emit('tap')
      timeout = setTimeout(function () {
          clearTimeout(timeout)
      }, 500)
    }
    lastTap = currentTime
  })
}
