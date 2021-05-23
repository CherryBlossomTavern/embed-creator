const express = require('express')
const compression = require('compression')

const { port } = require('./config')

express()
  .use(compression())
  .use(express.static('dist'))
  .listen(port)

console.log(`Server litsening on port ${port}.`)
