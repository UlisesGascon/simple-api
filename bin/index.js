#!/usr/bin/env node

const { logger } = require('../src/utils')

const app = require('../src/server')({
  swaggerEnabled: true
})

const port = parseInt([process.argv[2]]) || 0

const server = app.listen(port, () =>
  logger.info(`Server listening on port ${server.address().port}!`)
)
