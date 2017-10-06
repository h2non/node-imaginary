const assign = require('object-assign')
const request = require('./request')

class Imaginary {

  constructor (image, url) {
    this.url = url
    this.image = image
    this.params = {}
  }

  server (url, httpParamsObj = {}) {
    return this.balance(url, httpParamsObj)
  }

  balance (urls, httpParamsObj = {}) {
    this.url = urls
    this.httpParamsObj = httpParamsObj
    return this
  }

  image (image) {
    this.image = image
    return this
  }

  httpParams (httpParamsObj) {
    this.httpParamsObj = httpParamsObj
    return this
  }

  key (key) {
    this.params.key = key
    return this
  }

  imageUrl (url) {
    this.params.url = url
    return this
  }

  params (params) {
    Object.assign(this.params, params)
    return this
  }

  crop (params, cb) {
    return this.process('crop', params, cb)
  }

  convert (params, cb) {
    return this.process('convert', params, cb)
  }

  resize (params, cb) {
    return this.process('resize', params, cb)
  }

  enlarge (params, cb) {
    return this.process('enlarge', params, cb)
  }

  extract (params, cb) {
    return this.process('extract', params, cb)
  }

  info (params, cb) {
    return this.process('info', params, cb)
  }

  embed (params, cb) {
    return this.process('embed', params, cb)
  }

  rotate (params, cb) {
    return this.process('rotate', params, cb)
  }

  flip (params, cb) {
    return this.process('flip', params, cb)
  }

  flop (params, cb) {
    return this.process('flop', params, cb)
  }

  thumbnail (params, cb) {
    return this.process('thumbnail', params, cb)
  }

  zoom (params, cb) {
    return this.process('zoom', params, cb)
  }

  watermark (params, cb) {
    return this.process('watermark', params, cb)
  }

  smartcrop (params, cb) {
    return this.process('smartcrop', params, cb)
  }

  pipeline (operations, params, cb) {
    params = params || {}
    if (!operations) {
      throw TypeError('pipeline params.operations must be a JSON string or a list')
    }
    if (Array.isArray(operations)) {
      operations = JSON.stringify(operations)
    }
    params.operations = operations
    return this.process('pipeline', params, cb)
  }

  health (cb) {
    this.params.get = true
    return this.process('health', null, cb)
  }

  versions (cb) {
    this.params.get = true
    return this.process('', null, cb)
  }

  process (action, params, cb) {
    let baseUrl = this.url

    if (!baseUrl) {
      throw new Error('Missing imaginary server URL')
    }

    if (Array.isArray(baseUrl)) {
      baseUrl = permute(baseUrl)
    }

    const opts = {
      params: assign({}, this.params, params),
      httpParams: this.httpParamsObj
    }

    return request(`${baseUrl}/${action}`, opts, this.image, cb)
  }
}

const permute = arr => {
  const item = arr.shift()
  arr.push(item)
  return item
}

module.exports = Imaginary
