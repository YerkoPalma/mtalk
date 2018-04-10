var minimist = require('minimist')
var { readdir, statSync, copyFileSync } = require('fs')
var assert = require('assert')
var rimraf = require('rimraf')
var Dat = require('dat-node')
var { resolve, dirname } = require('path')
var { spawn } = require('child_process')
var argv = minimist(process.argv.slice(2))

;(function (argv) {
  var entry = resolve(process.cwd(), argv._[0])
  var dist =resolve(dirname(entry), 'dist')
  assert.ok(statSync(entry).isDirectory(), '[make-talk]: Entry path must be a directory')
  // copy entry files into this template
  readdir(entry, (err, files) => {
    assert.ifError(err)
    for(var file of files) {
      copyFileSync(resolve(process.cwd(), argv._[0], file), resolve(__dirname, 'assets', 'slides', file))
    }
  })
  // build and generate
  var bankai = spawn(resolve('node_modules', '.bin', 'bankai'), ['build', resolve(__dirname, 'index.js'), dist])
  bankai.on('exit', (code, signal) => {
    console.log('finished bankai, removing files')
    rimraf(resolve(__dirname, 'assets', 'slides/*'), () => {
      // share on dat
      Dat(dist, (err, dat) => {
        assert.ifError(err)
        var network = dat.joinNetwork()
        network.once('connection', function () {
          console.log('Connected')
        })
        dat.importFiles(dist)
        console.log(`Sharing: ${dat.key.toString('hex')}\n`)
      })
    })
  })
  bankai.stderr.on('data', data => {
    console.log(data)
  })
})(argv)
