var Client = require('./client')
var pkg = require('../package.json')

module.exports = Imaginary

function Imaginary(image, url) {
  return new Imaginary(image, url || Imaginary.URL)
}

Imaginary.Client = Client
Imaginary.URL = 'http://localhost:8088'
Imaginary.VERSION = pkg.version
