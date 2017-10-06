var fs = require('fs')
var imaginary = require('..')
var serverUrl = 'http://localhost:9000'

const operations = [
  {
    operation: 'crop',
    params: {
      width: 400,
      height: 360
    }
  },
  {
    operation: 'watermark',
    params: {
      text: 'Hello World',
      textwidth: 200
    }
  },
  {
    operation: 'convert',
    params: {
      type: 'webp'
    }
  }
]

imaginary('test/fixtures/test.jpg')
  .server(serverUrl)
  .pipeline(operations)
  .on('error', function (err) {
    console.error('Cannot resize the image:', err)
  })
  .pipe(fs.createWriteStream('out.webp'))
