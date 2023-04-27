#!/usr/bin/env node
const { logger } = require('../src/utils')
const appInitialization = require('../src/server')

;(async () => {
  const app = await appInitialization({
    swaggerEnabled: true
  })

  const port = parseInt([process.argv[2]]) || 0

  const server = app.listen(port, () =>
    logger.info(`Server listening on port ${server.address().port}!`)
  )
})()
