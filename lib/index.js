var Client = require('./client')
var pkg = require('../package.json')

module.exports = Imaginary

function Imaginary(image, url) {
  return new Client(image, url)
}

Imaginary.Client = Client
Imaginary.VERSION = pkg.version
