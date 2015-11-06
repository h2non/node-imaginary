var merge = require('merge')
var request = require('./request')

module.exports = Imaginary

function Imaginary(image, url) {
  this.url = url
  this.image = image
  this.params = {}
}

Imaginary.prototype.server =
Imaginary.prototype.balance = function (url) {
  this.url = url
  return this
}

Imaginary.prototype.image = function (image) {
  this.image = image
  return this
}

Imaginary.prototype.key = function (key) {
  this.params.key = key
  return this
}

Imaginary.prototype.imageUrl = function (url) {
  this.params.url = url
  return this
}

Imaginary.prototype.params = function (params) {
  merge(this.params, params)
  return this
}

Imaginary.prototype.crop = function (params, cb) {
  return this.process('crop', params, cb)
}

Imaginary.prototype.convert = function (params, cb) {
  return this.process('convert', params, cb)
}

Imaginary.prototype.resize = function (params, cb) {
  return this.process('resize', params, cb)
}

Imaginary.prototype.enlarge = function (params, cb) {
  return this.process('enlarge', params, cb)
}

Imaginary.prototype.extract = function (params, cb) {
  return this.process('extract', params, cb)
}

Imaginary.prototype.info = function (params, cb) {
  return this.process('info', params, cb)
}

Imaginary.prototype.embed = function (params, cb) {
  return this.process('embed', params, cb)
}

Imaginary.prototype.rotate = function (params, cb) {
  return this.process('rotate', params, cb)
}

Imaginary.prototype.flip = function (params, cb) {
  return this.process('flip', params, cb)
}

Imaginary.prototype.flop = function (params, cb) {
  return this.process('flop', params, cb)
}

Imaginary.prototype.thumbnail = function (params, cb) {
  return this.process('thumbnail', params, cb)
}

Imaginary.prototype.zoom = function (params, cb) {
  return this.process('zoom', params, cb)
}

Imaginary.prototype.watermark = function (params, cb) {
  return this.process('watermark', params, cb)
}

Imaginary.prototype.health = function (cb) {
  this.params.get = true
  return this.process('health', null, cb)
}

Imaginary.prototype.versions = function (cb) {
  this.params.get = true
  return this.process('', null, cb)
}

Imaginary.prototype.process = function (action, params, cb) {
  var baseUrl = this.url
  if (Array.isArray(baseUrl)) {
    baseUrl = permute(baseUrl)
  }

  if (!baseUrl) {
    throw new Error('Missing imaginary server URL')
  }

  var url = baseUrl + '/' + action
  var opts = merge({}, this.params, params)
  return request(url, opts, this.image, cb)
}

function permute(arr) {
  var item = arr.shift()
  arr.push(item)
  return item
}
