var Imaginary = require('../')
var expect = require('chai').expect
var nock = require('nock')
var fs = require('fs')

suite('Imaginary', function () {
  test('API', function () {
    expect(Imaginary).to.be.a('function')
  })

  test('VERSION', function () {
    expect(Imaginary.VERSION).to.be.a('string')
  })

  nock('http://server.com')
    .get('/image.jpg')
    .replyWithFile(200, __dirname + '/fixtures/test.jpg')

  nock('http://localhost:8088')
    .persist()
    .filteringPath(function (path) { return '/' })
    .post('/')
    .replyWithFile(200, __dirname + '/fixtures/test.jpg')

  test('remove image', function (done) {
    Imaginary('http://server.com/image.jpg')
      .server('http://localhost:8088')
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

  test('#crop', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .server('http://localhost:8088')
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
      .server('http://localhost:8088')
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
      .server('http://localhost:8088')
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
      .server('http://localhost:8088')
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

  test('#extract', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .server('http://localhost:8088')
      .extract({ top: 100, left: 100, width: 400 })
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

  test('#health', function (done) {
    nock('http://imaginary')
      .get('/health')
      .query({ get: true })
      .reply(200, { uptime: 123, goroutines: 12, cpus: 8 })

    Imaginary('./test/fixtures/test.jpg')
      .server('http://imaginary')
      .health(function (err, res) {
        expect(err).to.be.null
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.a('string')
        done(err)
      })
  })

  test('httpParams', function (done) {
    Imaginary('./test/fixtures/test.jpg')
      .server('http://localhost:8088')
      .httpParams({ timeout: 5000 })
      .crop({ width: 400 })
      .on('response', function (res) {
        expect(res.request.timeout).to.be.equal(5000)
        done()
      })
  })
})
