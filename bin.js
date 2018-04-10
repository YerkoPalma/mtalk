var minimist = require('minimist')
var { readdir, statSync, copyFileSync } = require('fs')
var assert = require('assert')
var rimraf = require('rimraf')
var { resolve, dirname } = require('path')
var { spawn } = require('child_process')
var argv = minimist(process.argv.slice(2))

;(function (argv) {
  var entry = resolve(process.cwd(), argv._[0])
  assert.ok(statSync(entry).isDirectory(), '[make-talk]: Entry path must be a directory')
  // copy entry files into this template
  readdir(entry, (err, files) => {
    assert.ifError(err)
    for(var file of files) {
      copyFileSync(resolve(process.cwd(), argv._[0], file), resolve(__dirname, 'assets', 'slides', file))
    }
  })
  // build and generate
  var bankai = spawn(resolve('node_modules', '.bin', 'bankai'), ['build', resolve(__dirname, 'index.js'), resolve(dirname(entry), 'dist')])
  bankai.on('exit', (code, signal) => {
    console.log('finished bankai, removing files')
    rimraf(resolve(__dirname, 'assets', 'slides/*'), () => console.log('removed slides from source'))
  })
  bankai.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })
  bankai.stderr.on('data', data => {
    console.log(`stderr: ${data}`)
  })
})(argv)
