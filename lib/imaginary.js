var Client = require('./client')
var pkg = require('../package.json')

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
Imaginary.servers = url =>
  Imaginary.URL = url

/**
 * Default server URL
 */

Imaginary.URL = 'http://localhost:9000'

/**
 * Expose the API client
 */

Imaginary.Client = Client

/**
 * Current client version
 */

Imaginary.VERSION = pkg.version

module.exports = Imaginary
