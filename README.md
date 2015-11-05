# node-imaginary [![Build Status](https://api.travis-ci.org/h2non/node-imaginary.svg?branch=master)][travis] [![Dependency Status](https://gemnasium.com/h2non/node-imaginary.svg)][gemnasium] [![NPM version](https://badge.fury.io/js/imaginary.svg)][npm]

Minimalist node.js/io.js CLI & programmatic stream capable interface for [imaginary](https://github.com/h2non/imaginary) server.

Supports multiple image operations such as resize, crop, zoom, watermark, rotate... and both local and remote URL based image source processing, and additionally provides a simple balancing feature to use multiple imaginary servers.

To get started take a look to the [command-line usage](#cli) and programmatic [API](#api)

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
  extract [options] [image]    Extract area from an image by top/left and width/height
  enlarge [options] [image]    Enlarge the image to the given width and height in pixels
  rotate [options] [image]     Rotate the image by degrees
  flip [options] [image]       Flip an image
  flop [options] [image]       Flop an image
  zoom [options] [image]       Zoom the image to the given width or height in pixels
  watermark [options] [image]  Add a text watermark in the image
  info [options] [image]       Retrieve image information as JSON

Options:

  -h, --help     output usage information
  -V, --version  output the version number

Examples:

  $ imaginary crop -w 200 -o out.jpg image.jpg
  $ imaginary resize -w 300 -o out.jpg http://server.net/image.jpg
  $ imaginary zoom -f 2 -w 300 -o out.jpg http://server.net/image.jpg
  $ imaginary watermark --text "copyright" -o out.jpg http://server.net/image.jpg
```

## API

### imaginary(image, [imaginaryUrl])

Constructor of the imaginary client

Take an image from disk:
```js
var fs = require('fs')
var imaginary = require('imaginary')
var serverUrl = 'http://imaginary.company.net'

imaginary('image.jpg')
  .server(serverUrl)
  .crop({ widht: 200 })
  .on('error', function (err) {
    console.error('Cannot resize the image:', err)
  })
  .pipe(fs.createWriteStream('out.jpg'))
```

Take an image from remote URL:
```js
imaginary('http://server.com/image.jpg')
  .crop({ width: 100 })
  .on('error', function (err) {
    console.error('Cannot resize the image:', err)
  })
  .pipe(fs.createWriteStream('out.jpg'))
```

Take an image as readable stream:
```js
imaginary(fs.readFileStream('image.jpg'))
  .crop({ width: 100 })
  .on('error', function (err) {
    console.error('Cannot resize the image:', err)
  })
  .pipe(fs.createWriteStream('out.jpg'))
```

### Supported params

See the full list of supported query params [here](https://github.com/h2non/imaginary#params).

Take a look to each specific endpoint to see which specific params are supported or not.
Image measures are always in pixels, unless otherwise indicated.

#### imaginary#key(key)

Define the API key required by the imaginary server (optional)

#### imaginary#server(url)

Define the imaginary server URL

#### imaginary#balance(urls)

Balance between a pool of imaginary server URLs

#### imaginary#params(params)

Define resuable params to image

#### imaginary#image(image)

Pass the image path, image URL or `ReadableStream` to the image file

#### imaginary#imageUrl(url)

Pass the image URL to process

#### imaginary#crop(params)

Crop an image to a given square thumbnail in pixels.

#### imaginary#resize(params)

Resize an image by width, height or both

#### imaginary#enlarge(params)

Enlarge an image by width and/or height

#### imaginary#extract(params)

Extract image area by top/left and width/height pixels

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

#### imaginary#watermark(params)

Add a watermark to an image

#### imaginary#thumbnail(params)

Thumbnail an image with a given width or height

#### imaginary#info()

Get the metadata info of the image as JSON

#### imaginary#health()

Retrieve server health status

#### imaginary#versions()

Retrieve imaginary, bimg and libvips versions

### imaginary.VERSION

Get the current module version

## License

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[travis]: http://travis-ci.org/h2non/node-imaginary
[gemnasium]: https://gemnasium.com/h2non/node-imaginary
[npm]: http://npmjs.org/package/imaginary
