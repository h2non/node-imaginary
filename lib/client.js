var request = require('./request')

module.exports = Imaginary

function Imaginary(image, url) {
  this.image = image
  this.baseUrl = url
}

Imaginary.prototype.image = function (image) {
  this.image = image
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

Imaginary.prototype.process = function (action, params) {
  var self = this
  var url = this.baseUrl + '/' + action

  return request(url, params, this.image)
    .on('response', function (res) {
      if (res.status === 200) {
        self.image = res.body
      }
    })
}

