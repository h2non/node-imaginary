require("babel-register")
var Client = require('./client')
var pkg = require('../package.json')

module.exports = Imaginary

/**
 * API factory
 */

function Imaginary (image, url) {
  return new Client(image, url || Imaginary.URL)
}

/**
 * Define default imaginary server/s
 * @param {string/array} url - Server URL or array of URLs
 */

Imaginary.server =
Imaginary.servers = function (url) {
  Imaginary.URL = url
}

/**
 * Default server URL
 */

Imaginary.URL = 'http://localhost:8088'

/**
 * Expose the API client
 */

Imaginary.Client = Client

/**
 * Current client version
 */

Imaginary.VERSION = pkg.version
