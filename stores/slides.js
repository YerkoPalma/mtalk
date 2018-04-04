/* global fetch */
var md = require('../lib/md')

module.exports = store

var events = store.events = {
  NEXT: 'slides:next',
  PREV: 'slides:prev',
  LOAD: 'slides:load'
}
function store (state, emitter) {
  state.slides = {
    current: 0,
    title: '',
    next: '',
    prev: ''
  }

  emitter.on('DOMContentLoaded', function () {
    window.addEventListener('keydown', function (event) {
      if (event.key === ' ' || event.key === 'ArrowRight') {
        emitter.emit(events.NEXT)
      } else if (event.key === 'ArrowLeft') {
        emitter.emit(events.PREV)
      }
    })
  })
  emitter.on(events.NEXT, function () {
    if (state.slides.next !== '.') {
      state.slides.current++
      emitter.emit(events.LOAD, state.slides.next)
    }
  })
  emitter.on(events.PREV, function () {
    if (state.slides.prev !== '.') {
      state.slides.current--
      emitter.emit(events.LOAD, state.slides.prev)
    }
  })
  emitter.on(events.LOAD, function (slide) {
    fetch('../assets/slides/' + slide)
      .then(response => response.text())
      .then(text => {
        var renderer = md(text)
        state.slides.content = renderer.render
        state.slides.title = renderer.meta.title
        state.slides.next = renderer.meta.next
        state.slides.prev = renderer.meta.prev
        emitter.emit('render')
      })
  })
}
