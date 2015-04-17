var fs = require('fs')
var stream = require('stream')
var http = require('request')

module.exports = request

function request(url, params, body) {
  return read(body).pipe(http({
    url: url,
    qs: params,
    method: 'POST',
    strictSSL: false
  }))
}

function read(image) {
  if (typeof image === 'string') {
    if (/^http[s]?/i.test(image)) {
      return http(image)
    }
    return fs.createReadStream(image)
  }

  if (isStream(image) === false) {
    throw new TypeError('Image should a string or readable stream')
  }

  return image
}

function isStream(obj) {
  return obj instanceof stream.Stream
}
