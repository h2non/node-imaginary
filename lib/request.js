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
    return readFromString(image)
  }

  if (isStream(image) === false) {
    throw new TypeError('Image should be a string or readable stream')
  }

  return image
}

function readFromString(image) {
  if (isUrl(image)) {
    return http(image, { strictSSL: false })
  }
  return fs.createReadStream(image)
}

function isStream(obj) {
  return obj instanceof stream.Stream
}

function isUrl(str) {
  return /^http[s]?/i.test(str)
}
