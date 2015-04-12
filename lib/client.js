var request = require('request')

module.exports = Imaginary

function Imaginary(url, image) {
  this.baseUrl = url
  this.image = image
}

Imaginary.prototype.image = function (image) {
  this.image = image
  return this
}

Imaginary.prototype.crop = function (resolution) {
  return request(this.url('crop', resolution))
}

Imaginary.prototype.width = function (resolution) {
  return request(this.url('width', resolution))
}

Imaginary.prototype.height = function (resolution) {
  return request(this.url('height', resolution))
}

Imaginary.prototype.resizeInBox = function (resolution) {
  return request(this.url('resizeinbox', resolution))
}

Imaginary.prototype.resizeNP = function (resolution) {
  return request(this.url('resizenp', resolution))
}

Imaginary.prototype.cdn = function () {
  return request(this.url('cdn'))
}

Imaginary.prototype.url = function (action, params) {
  return 'http://' + this.baseUrl + '/' + action + '/' + params
}
