const pino = require('pino')
const todos = require('./data/todos.json')

const logger = pino({
  enabled: process.env.NODE_ENV !== 'test',
  level: 'info'
})

const getAllTodos = () => todos
const getTodoById = id => todos.find(todo => todo.id === id)

const setCacheMiddleware = (req, res, next) => {
  // @SEE: https://regbrain.com/article/cache-headers-express-js
  const FIVE_MINUTES = 60 * 5
  res.set(
    'Cache-control',
    req.method === 'GET' ? `public, max-age=${FIVE_MINUTES}` : 'no-store'
  )
  next()
}

const handleNotFoundTodoMiddleware = (req, res, next) => {
  const todo = getTodoById(req.params.id)

  if (!todo) {
    logger.info(`Todo with id ${req.params.id} not found`)
    return res.status(404).json({ message: 'Todo not found' })
  }
  req.todo = todo
  next()
}

module.exports = {
  logger,
  setCacheMiddleware,
  handleNotFoundTodoMiddleware,
  getAllTodos,
  getTodoById
}
