var minimist = require('minimist')
var { readdir, statSync, copyFileSync } = require('fs')
var assert = require('assert')
var { resolve } = require('path')
var { spawn } = require('child_process')
var argv = minimist(process.argv.slice(2))

;(function (argv) {
  var entry = resolve(process.cwd(), argv._[0])
  assert.ok(statSync(entry).isDirectory(), '[make-talk]: Entry path must be a directory')
  // copy entry files into this template
  readdir(entry, (err, files) => {
    assert.ifError(err)
    for(var file in files) {
      copyFileSync(resolve(process.cwd(), argv._[0], file), resolve(__dirname, 'assets', 'slides', file))
    }
  })
  // build and generate
  var bankai = spawn('bankai', ['build', resolve(__dirname, 'index.js')])
  bankai.on('exit', (code, signal) => {
    // run dat
    var dat = spawn('dat', [resolve(__dirname, 'index.js')])
  })
})(argv)
