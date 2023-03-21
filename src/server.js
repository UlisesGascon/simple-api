const express = require('express')
const bodyParser = require('body-parser')
const pinoHTTP = require('pino-http')
const helmet = require('helmet')
const validator = require('swagger-endpoint-validator')
const compression = require('compression')
const simpleCacheControlMiddleware = require('simple-cache-control-middleware')
const cors = require('cors')
const { join } = require('path')
const { logger, getAllTodos, handleNotFoundTodoMiddleware } = require('./utils')
const crypto = require('crypto')

const defaultSettings = {
  swaggerEnabled: false
}
const appInitialization = (config = {}) => {
  const settings = { ...defaultSettings, ...config }
  logger.info(`Settings: ${JSON.stringify(settings)}`)
  const app = express()

  // Middleware
  if (process.env.NODE_ENV !== 'test') {
    app.use(pinoHTTP())
  }

  app.use(helmet())
  app.use(compression())
  app.use(cors())
  app.use(
    bodyParser.json({
      limit: '100kb'
    })
  )
  app.use(simpleCacheControlMiddleware())

  // Validation for API Endpoints
  if (settings.swaggerEnabled) {
    logger.info('Swagger enabled')
    validator.init(app, {
      apiDocEndpoint: '/__/docs',
      fileUploader: false,
      validateRequests: true,
      validateResponses: true,
      format: 'yaml',
      yaml: {
        file: join(__dirname, 'syncapi.yaml')
      }
    })
  }

  // Routes
  app.get('/__/health', (req, res) => {
    res.json({ status: 'UP' })
  })

  app.get('/v1/todos', (req, res) => {
    logger.info('Getting all todos')
    res.json(getAllTodos())
  })

  app.get('/v1/todos/:id', handleNotFoundTodoMiddleware, (req, res) => {
    logger.info(`Getting todo with id ${req.params.id}`)
    res.json(req.todo)
  })

  app.post('/v1/todos', (req, res) => {
    logger.info('Creating todo')
    res.json({
      title: req.body.title,
      id: crypto.randomUUID(),
      completed: false
    })
  })

  app.put('/v1/todos/:id', handleNotFoundTodoMiddleware, (req, res) => {
    logger.info(`Updating todo with id ${req.params.id}`)
    res.json(req.body)
  })

  app.delete('/v1/todos/:id', handleNotFoundTodoMiddleware, (req, res) => {
    logger.info(`Deleting todo with id ${req.params.id}`)
    res.json(req.todo)
  })

  app.patch('/v1/todos/:id', handleNotFoundTodoMiddleware, (req, res) => {
    logger.info(`Updating todo with id ${req.params.id}`)
    res.json({ ...req.todo, ...req.body })
  })

  return app
}

module.exports = appInitialization
