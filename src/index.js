const { logger } = require('./utils')
const server = require('./server')

const port = process.env.PORT || 3000

;(async () => {
  const app = await server({
    swaggerEnabled: true
  })

  app.listen(port, () => logger.info(`Server listening on port ${port}!`))
})()
