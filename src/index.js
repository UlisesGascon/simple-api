const { logger } = require('./utils')

const server = require('./server')

const port = process.env.PORT || 3000

server.listen(port, () => logger.info(`Server listening on port ${port}!`))