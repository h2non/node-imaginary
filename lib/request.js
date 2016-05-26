var fs = require('fs')
var stream = require('stream')
var http = require('request')

module.exports = request

function request (url, params, body, cb) {
  var requester = doRequest(url, params, cb)

  if (params.url || params.get) {
    return requester('GET')
  }

  return read(body).pipe(requester('POST'))
}

function doRequest (url, params, cb) {
  return function (method) {
    function handler (err, res) {
      // Check server response
      if (res && res.statusCode >= 400) {
        err = new Error('Invalid server response: ' + res.statusCode)
        req.emit('error', err, res)
      }
      cb(err, res)
    }

    var req = http({
      url: url,
      qs: params,
      method: method,
      strictSSL: false
    }, handler)

    return req
  }
}

function read (image) {
  if (typeof image === 'string') {
    return readFromString(image)
  }

  if (isStream(image) === false) {
    throw new TypeError('Image should be a string or readable stream')
  }

  return image
}

function readFromString (image) {
  if (isUrl(image)) {
    return http(image, { strictSSL: false })
  }
  return fs.createReadStream(image)
}

function isStream (obj) {
  return obj instanceof stream.Stream
}

function isUrl (str) {
  return /^http[s]?/i.test(str)
}
