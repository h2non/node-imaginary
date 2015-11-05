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

Imaginary.prototype.crop = function (params) {
  return this.process('crop', params)
}

Imaginary.prototype.convert = function (params) {
  return this.process('convert', params)
}

Imaginary.prototype.resize = function (params) {
  return this.process('resize', params)
}

Imaginary.prototype.enlarge = function (params) {
  return this.process('enlarge', params)
}

Imaginary.prototype.extract = function (params) {
  return this.process('extract', params)
}

Imaginary.prototype.info = function (params) {
  return this.process('info', params)
}

Imaginary.prototype.embed = function (params) {
  return this.process('embed', params)
}

Imaginary.prototype.rotate = function (params) {
  return this.process('rotate', params)
}

Imaginary.prototype.flip = function (params) {
  return this.process('flip', params)
}

Imaginary.prototype.flop = function (params) {
  return this.process('flop', params)
}

Imaginary.prototype.thumbnail = function (params) {
  return this.process('thumbnail', params)
}

Imaginary.prototype.zoom = function (params) {
  return this.process('zoom', params)
}

Imaginary.prototype.watermark = function (params) {
  return this.process('watermark', params)
}

Imaginary.prototype.health = function () {
  this.params.get = true
  return this.process('health')
}

Imaginary.prototype.versions = function () {
  this.params.get = true
  return this.process('')
}

Imaginary.prototype.process = function (action, params) {
  var baseUrl = this.url
  if (Array.isArray(baseUrl)) {
    baseUrl = permute(url)
  }

  if (!baseUrl) {
    throw new Error('Missing imaginary server URL')
  }

  var url = baseUrl + '/' + action
  var opts = merge({}, this.params, params)
  return request(url, opts, this.image)
}

function permute(arr) {
  var item = arr.shift()
  arr.push(item)
  return item
}
