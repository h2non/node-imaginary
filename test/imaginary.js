var Imaginary = require('../')
var expect = require('chai').expect
var fs = require('fs')

suite('Imaginary', function () {
  test('API', function () {
    expect(Imaginary).to.be.a('function')
  })

  test('VERSION', function () {
    expect(Imaginary.VERSION).to.be.a('string')
  })

  test('remove image', function (done) {
    Imaginary('http://bit.ly/1Cqb78Z')
      .rotate({ rotate: 90 })
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 3000).to.be.true
          done()
        })
      })
      //.pipe(fs.createWriteStream('out.jpg'))
  })

  test('#crop', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .crop({ width: 400 })
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 3000).to.be.true
          done()
        })
      })
  })

  test('#resize', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .resize({ width: 300 })
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 3000).to.be.true
          done()
        })
      })
  })

  test('#thumbnail', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .thumbnail({ width: 300 })
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 3000).to.be.true
          done()
        })
      })
  })

  test('#rotate', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .rotate({ rotate: 90 })
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 3000).to.be.true
          done()
        })
      })
  })

})
