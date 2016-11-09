const fs = require('fs')
const stream = require('stream')
const http = require('request')
const assign = require('object-assign')

const noop = () => {}

const isUrl = str => /^http[s]?/i.test(str)

const isStream = obj => obj instanceof stream.Stream

const readFromString = image => {
  if (isUrl(image)) {
    return http(image, { strictSSL: false })
  } else {
    return fs.createReadStream(image)
  }
}

const request = (url, opts, body, cb) => {
  const requester = doRequest(url, opts.params, opts.httpParams, cb)

  if (opts.params.url || opts.params.get) {
    return requester('GET')
  }

  return read(body).pipe(requester('POST'))
}

const doRequest = (url, qs, httpParams, cb = noop) => {
  return method => {
    const mergedParams = assign({}, httpParams, {
      url,
      qs,
      method,
      strictSSL: false
    })

    const handler = (err, res) => {
      // Check server response
      if (res && res.statusCode >= 400) {
        err = new Error('Invalid server response: ' + res.statusCode)
        req.emit('error', err, res)
      }
      cb(err, res)
    }

    // Run request
    const req = http(mergedParams, handler)

    // Return request promise
    return req
  }
}

const read = image => {
  if (typeof image === 'string') {
    return readFromString(image)
  }

  if (isStream(image) === false) {
    throw new TypeError('Image should be a string or readable stream')
  }

  return image
}

module.exports = request
