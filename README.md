# node-imaginary [![Build Status](https://api.travis-ci.org/h2non/node-imaginary.svg?branch=master)][travis] [![Dependency Status](https://gemnasium.com/h2non/node-imaginary.svg)][gemnasium] [![NPM version](https://badge.fury.io/js/imaginary.svg)][npm]

Minimalist node.js/io.js CLI & programmatic stream-based interface for [imaginary](https://github.com/h2non/imaginary) HTTP API

## Installation

For command-line usage, install it as global package:
```bash
npm install -g imaginary
```

For programmatic usage, install it in the tree dependency:
```bash
npm install imaginary --save[-dev]
```

## CLI

```bash
$ imaginary --help
```

```bash
Usage: imaginary [options] [command]


Commands:

  crop [options] [image]       Crop any image to a given square thumbnail in pixels
  resize [options] [image]     Resize the image to the given width or height in pixels
  embed [options] [image]      Embed the image to the given width or height in pixels
  rotate [options] [image]     Embed the image to the given width or height in pixels
  flip [options] [image]       Embed the image to the given width or height in pixels
  flop [options] [image]       Embed the image to the given width or height in pixels
  zoom [options] [image]       Zoom the image to the given width or height in pixels
  watermark [options] [image]  Add a text watermark in the imaeg

Options:

  -h, --help     output usage information
  -V, --version  output the version number

Examples:

  $ imaginary crop -w 200 -o out.jpg image.jpg
  $ imaginary resize -w 300 -o out.jpg http://server.net/image.jpg
  $ imaginary zoom -f 2 -w 300 -o out.jpg http://server.net/image.jpg
  $ imaginary watermark --text "copyright" -o out.jpg http://server.net/image.jpg
````

## API

### imaginary(image, [serverUrl])

Constructor of the imaginary client

Reading image from disk:
```js
var fs = require('fs')
var imaginary = require('imaginary')
var serverUrl = 'http://imaginary.company.net'

imaginary('image.jpg', serverUrl)
  .crop({ widht: 200 })
  .on('error', function (err) {
    console.error('Cannot resize the image:', err)
  })
  .pipe(fs.createWriteStream('out.jpg'))
```

Reading image from remote:
```js
imaginary('http://server.com/image.jpg')
  .crop({ width: 100 })
  .on('error', function (err) {
    console.error('Cannot resize the image:', err)
  })
  .pipe(fs.createWriteStream('test.jpg'))
```

Reading image from disk:
```js
imaginary(fs.readFileStream('image.jpg'))
  .crop({ width: 100 })
  .on('error', function (err) {
    console.error('Cannot resize the image:', err)
  })
  .pipe(fs.createWriteStream('test.jpg'))
```

#### imaginary#key(key)

Define the API key required by the required

#### imaginary#params(params)

Define resuable params to image

#### imaginary#image(image)

Pass the image path, image URL or `ReadableStream` to the image file

#### imaginary#crop(params)

Crop an image to a given square thumbnail in pixels.

#### imaginary#resize(params)

Resize an image. Example: `200`

#### imaginary#expand(params)

Resize any image to a given height in pixels.

#### imaginary#zoom(params)

Zoom an image by the given height in pixels.

#### imaginary#rotate(params)

Rotate an image to a given degrees (must be multiple of 90)

#### imaginary#flip(params)

Flip an image

#### imaginary#flop(params)

Flop an image

### imaginary.VERSION

Get the current module version

## License

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[travis]: http://travis-ci.org/h2non/node-imaginary
[gemnasium]: https://gemnasium.com/h2non/node-imaginary
[npm]: http://npmjs.org/package/imaginary
