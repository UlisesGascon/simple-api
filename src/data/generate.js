const { faker } = require('@faker-js/faker')
const { join } = require('path')
const { writeFileSync } = require('fs')

console.log('Generating data...')

const data = Array.from({ length: 200 }, (el, index) => ({
  id: faker.datatype.uuid(),
  title: faker.hacker.phrase(),
  completed: faker.datatype.boolean()
}))

writeFileSync(
  join(process.cwd(), '/src/data/todos.json'),
  JSON.stringify(data, null, 2)
)

console.log('✅ Data generated')