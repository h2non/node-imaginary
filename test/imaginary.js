var Imaginary = require('../')
var expect = require('chai').expect

suite('Imaginary', function () {
  test('API', function () {
    expect(Imaginary).to.be.a('function')
  })

  test('VERSION', function () {
    expect(Imaginary.VERSION).to.be.a('string')
  })

  test('#crop', function (done) {
    Imaginary('http://bit.ly/1Cqb78Z')
      .crop('100x100')
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

  test('#width', function (done) {
    Imaginary('http://bit.ly/1Cqb78Z')
      .width('100')
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length > 2000).to.be.true
          done()
        })
      })
  })

  test('#height', function (done) {
    Imaginary('http://bit.ly/1Cqb78Z')
      .height('100')
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length === 4120).to.be.true
          done()
        })
      })
  })

  test('#resizeInBox', function (done) {
    Imaginary('http://bit.ly/1Cqb78Z')
      .resizeInBox('100x100')
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length === 4120).to.be.true
          done()
        })
      })
  })

  test('#resizeNP', function (done) {
    Imaginary('http://bit.ly/1Cqb78Z')
      .resizeInBox('100x100')
      .on('response', function (res) {
        var length = 0
        res.on('data', function (data) {
          length += data.length
        })
        res.on('end', function () {
          expect(length === 4120).to.be.true
          done()
        })
      })
  })

  test('#cdn', function (done) {
    Imaginary('http://bit.ly/1Cqb78Z')
      .cdn()
      .on('end', function () {
        done()
      })
  })
})
