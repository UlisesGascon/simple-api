const request = require('supertest')
const appInitialization = require('../src/server')

const { getAllTodos, getTodoById } = require('../src/utils')

const fixtures = {
  uuidRegex: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/g,
  unusedId: '83af1f72-db1c-4e2d-bd50-ef75f178bac9'
}

let serverWithSwagger
let serverWithoutSwagger

beforeAll(async () => {
  serverWithSwagger = await appInitialization({ swaggerEnabled: true })
  serverWithoutSwagger = await appInitialization({ swaggerEnabled: false })
})

describe('GET /__/docs', () => {
  it('should return swagger docs', async () => {
    const res = await request(serverWithSwagger).get('/__/docs/')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toMatch(/Swagger UI/)
  })

  it('should return 404 if swagger is disabled', async () => {
    const res = await request(serverWithoutSwagger).get('/__/docs/')
    expect(res.statusCode).toEqual(404)
  })
})

describe('GET /__/health', () => {
  it('should de running', async () => {
    const res = await request(serverWithSwagger).get('/__/health')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ status: 'UP' })
  })
})

describe('GET /v1/todo', () => {
  it('should return all todos', async () => {
    const res = await request(serverWithSwagger).get('/v1/todo')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(getAllTodos())
  })
})

describe('GET /v1/todo/:id', () => {
  it('should return a todo', async () => {
    const id = getAllTodos()[0].id
    const res = await request(serverWithSwagger).get(`/v1/todo/${id}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(getTodoById(id))
  })

  it('should return 404 if todo not found', async () => {
    const res = await request(serverWithSwagger).get(
      `/v1/todo/${fixtures.unusedId}`
    )
    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({ message: 'Todo not found' })
  })
})

describe('POST /v1/todo', () => {
  it('should create a todo', async () => {
    const res = await request(serverWithSwagger)
      .post('/v1/todo')
      .send({
        title: 'New todo'
      })
    expect(res.statusCode).toBe(200)
    expect(res.body.id).toMatch(fixtures.uuidRegex)
    expect(res.body.title).toBe('New todo')
    expect(res.body.completed).toBe(false)
  })
})

describe('PUT /v1/todo/:id', () => {
  it('should update a todo', async () => {
    const id = getAllTodos()[0].id
    const res = await request(serverWithSwagger)
      .put(`/v1/todo/${id}`)
      .send({
        title: 'Updated todo',
        completed: true
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.id).toBe(id)
    expect(res.body.title).toBe('Updated todo')
    expect(res.body.completed).toBe(true)
  })

  it('should return 404 if todo not found', async () => {
    const res = await request(serverWithSwagger)
      .put(`/v1/todo/${fixtures.unusedId}`)
      .send({
        title: 'Updated todo',
        completed: true
      })
    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({ message: 'Todo not found' })
  })
})

describe('PATCH /v1/todo/:id', () => {
  it('should update a todo', async () => {
    const { id, completed } = getAllTodos()[0]

    const res = await request(serverWithSwagger)
      .patch(`/v1/todo/${id}`)
      .send({
        title: 'Updated todo'
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body.id).toBe(id)
    expect(res.body.title).toBe('Updated todo')
    expect(res.body.completed).toBe(completed)
  })

  it('should return 404 if todo not found', async () => {
    const res = await request(serverWithSwagger)
      .patch(`/v1/todo/${fixtures.unusedId}`)
      .send({
        title: 'Updated todo',
        completed: true
      })
    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({ message: 'Todo not found' })
  })
})

describe('DELETE /v1/todo/:id', () => {
  it('should delete a todo', async () => {
    const id = getAllTodos()[0].id
    const res = await request(serverWithSwagger).delete(`/v1/todo/${id}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.id).toBe(id)
  })

  it('should return 404 if todo not found', async () => {
    const res = await request(serverWithSwagger).delete(
      `/v1/todo/${fixtures.unusedId}`
    )
    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({ message: 'Todo not found' })
  })
})
