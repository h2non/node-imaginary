# node-imaginary [![Build Status](https://api.travis-ci.org/h2non/node-imaginary.svg?branch=master)][travis] [![Dependency Status](https://gemnasium.com/h2non/node-imaginary.svg)][gemnasium] [![NPM version](https://badge.fury.io/js/imaginary.svg)][npm]

Minimalist node.js/io.js CLI & programmatic stream-based interface for [imaginary](https://github.com/h2non/imaginary).
Support multiple image operations such as resize, crop, zoom, watermark, rotate...

Supports both local and remote URL based image processing.
For getting started, take a look to the [command-line usage](#cli) and programmatic [API](#api)

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

imaginary('image.jpg', serverUrl)
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

Complete list of available params. Take a look to each specific method to see which params are supported.
Image measures are always in pixels, unless otherwise indicated.

- width       `int`   - Width of image area to extract/resize
- height      `int`   - Height of image area to extract/resize
- top         `int`   - Top edge of area to extract. Example: `100`
- left        `int`   - Left edge of area to extract. Example: `100`
- areawidth   `int`   - Height area to extract. Example: `300`
- areaheight  `int`   - Width area to extract. Example: `300`
- quality     `int`   - JPEG image quality between 1-100. Default `80`
- compression `int`   - PNG compression level. Default: `6`
- rotate      `int`   - Image rotation angle. Must be multiple of `90`. Example: `180`
- factor      `int`   - Zoom factor level. Example: `2`
- margin      `int`   - Text area margin for watermark. Example: `50`
- dpi         `int`   - DPI value for watermark. Example: `150`
- textwidth   `int`   - Text area width for watermark. Example: `200`
- opacity     `float` - Opacity level for watermark text. Default: `0.2`
- noreplicate `bool`  - Disable text replication in watermark. Default `false`
- text        `string` - Watermark text content. Example: `copyright (c) 2189`
- font        `string` - Watermark text font type and format. Example: `sans bold 12`
- color       `string` - Watermark text RGB decimal base color. Example: `255,200,150`
- type        `string` - Specify the image format to output. Possible values are: `jpeg`, `png` and `webp`

#### imaginary#key(key)

Define the API key required by the imaginary server (optional)

#### imaginary#params(params)

Define resuable params to image

#### imaginary#image(image)

Pass the image path, image URL or `ReadableStream` to the image file

#### imaginary#crop(params)

Crop an image to a given square thumbnail in pixels.

#### imaginary#resize(params)

Resize an image by width, height or both

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

### imaginary.VERSION

Get the current module version

## License

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[travis]: http://travis-ci.org/h2non/node-imaginary
[gemnasium]: https://gemnasium.com/h2non/node-imaginary
[npm]: http://npmjs.org/package/imaginary
