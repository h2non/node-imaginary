var merge = require('merge')
var request = require('./request')

class Imaginary {

  constructor(image, url) {
    this.url = url
    this.image = image
    this.params = {}
    this.server = this.balance
  }

  balance(url) {
    this.url = url
    return this
  }

  image(image) {
    this.image = image
    return this
  }

  key(key) {
    this.params.key = key
    return this
  }

  imageUrl(url) {
    this.params.url = url
    return this
  }

  params(params) {
    merge(this.params, params)
    return this
  }

  crop(params, cb) {
    return this.process('crop', params, cb)
  }

  convert(params, cb) {
    return this.process('convert', params, cb)
  }

  resize(params, cb) {
    return this.process('resize', params, cb)
  }

  enlarge(params, cb) {
    return this.process('enlarge', params, cb)
  }

  extract(params, cb) {
    return this.process('extract', params, cb)
  }

  info(params, cb) {
    return this.process('info', params, cb)
  }

  embed(params, cb) {
    return this.process('embed', params, cb)
  }

  rotate(params, cb) {
    return this.process('rotate', params, cb)
  }

  flip(params, cb) {
    return this.process('flip', params, cb)
  }

  flop(params, cb) {
    return this.process('flop', params, cb)
  }

  thumbnail(params, cb) {
    return this.process('thumbnail', params, cb)
  }

  zoom(params, cb) {
    return this.process('zoom', params, cb)
  }

  watermark(params, cb) {
    return this.process('watermark', params, cb)
  }

  health(cb) {
    this.params.get = true
    return this.process('health', null, cb)
  }

  versions(cb) {
    this.params.get = true
    return this.process('', null, cb)
  }

  process(action, params, cb) {
    var baseUrl = this.url
    if (Array.isArray(baseUrl)) {
      baseUrl = permute(baseUrl)
    }

    if (!baseUrl) {
      throw new Error('Missing imaginary server URL')
    }

    var url = baseUrl + '/' + action
    var opts = merge({}, this.params, params)
    var handler = cb || function () {}

    return request(url, opts, this.image, handler)
  }
}

function permute (arr) {
  var item = arr.shift()
  arr.push(item)
  return item
}

module.exports = Imaginary