var html = require('choo/html')

module.exports = view

function view (state, emit) {
  if (!state.slides || !state.slides.content) {
    emit('slides:load', 'intro.md')
  }
  return html`
    <body class="cf center bg-washed-red code pa5">
      ${state.slides.content || html`<h2>Loading...</h2>`}
    </body>
  `
}
