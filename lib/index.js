// Runtime ES6 transpiler via module loading interception
require('babel-register')

// Exports imaginary API client
module.exports = require('./imaginary')
