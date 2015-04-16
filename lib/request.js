var fs = require('fs')
var http = require('request')

module.exports = request

function request(server, operation, image) {
  var url = server + '/' + operation

  return http({
    url: url,
    method: 'POST',
    formData: { file: readFile(image) }
  })
}

function readImage(image) {
  if (typeof image === 'string') {
    if (/http[s]?/i.test(image)) {
      throw new TypeError('Image URL is not supported yet')
    }
    image = fs.createReadStream(image)
  }
  return image
}
