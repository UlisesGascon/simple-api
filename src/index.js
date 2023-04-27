const { logger } = require('./utils')
const server = require('./server')

async function start () {
  const app = await server({
    swaggerEnabled: true
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => logger.info(`Server listening on port ${port}!`))
}

start()
