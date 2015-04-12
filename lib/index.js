var request = require('request')
var Client = require('./client')
var pkg = require('../package.json')

module.exports = Imaginary

function Imaginary(url) {
  return new Imaginary(url)
}

Imaginary.Client = Client
Imaginary.VERSION = pkg.version
