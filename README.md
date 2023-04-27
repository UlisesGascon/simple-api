<p align="center"><h1 align="center">
  @ulisesgascon/simple-api
</h1>

<p align="center">
  A very simple HTTP API to build fast prototypes
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/@ulisesgascon/simple-api"><img src="https://badgen.net/npm/v/@ulisesgascon/simple-api" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/@ulisesgascon/simple-api"><img src="https://badgen.net/npm/license/@ulisesgascon/simple-api" alt="license"/></a>
  <a href="https://www.npmjs.org/package/@ulisesgascon/simple-api"><img src="https://badgen.net/npm/dt/@ulisesgascon/simple-api" alt="downloads"/></a>
  <a href="https://snyk.io/test/github/ulisesgascon/@ulisesgascon/simple-api"><img src="https://snyk.io/test/github/ulisesgascon/@ulisesgascon/simple-api/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="https://deps.dev/project/github/ulisesgascon%2Fsimple-api"><img 
  src="https://api.securityscorecards.dev/projects/github.com/UlisesGascon/simple-api/badge"></a>
</p>

# About

A very simple HTTP API to build fast prototypes

## ❤️ Awesome Features:

- Typical Sample API with all the expected things (cors, fast response, immutability, etc..) 🚩
- Basic JSON storage without external dependencies or third party solutions 🔥
- Great testing coverage 🧪
- Easy to customize ⚙️
- Great Documentation with Swagger 📚
- Available as Npx, module, docker image and more... with a single command 📦

## Available Routes

Important:

- By running `npm run sample:generate` you will regenerate a new TODOs dataset
- The server allows CRUD Operations but this operations are not affecting the dataset at all

Endpoints:

- `GET /__/health` check health
- `GET /__/docs` Swagger documentation for all the available endpoints
- `GET /v1/todos` List all TODOS
- `POST /v1/todos` Create a TODO
- `GET /v1/todo/{id}` Get a specific TODO
- `PUT /v1/todo/{id}` Update a specific TODO
- `PATCH /v1/todo/{id}` PAtch a specific TODO property
- `DELETE /v1/todo/{id}` Delete a specific TODO

**PRO TIP** Run simple-api and check the Swagger docs with payload details and great UI 🍿

# Usage

## Command line 🪄

Using Node.js's `npx` to start a simple api in local:

```bash
npx @ulisesgascon/simple-api
```

You can specify the port:

```bash
npx @ulisesgascon/simple-api 3000
```

## Module 📦

Using `@ulisesgascon/simple-api` in your project:

```js
const appInitialization = require('@UlisesGascon/simple-api')

;(async () => {
const app = await appInitialization()

app.listen(3000, () => console.log(`Server listening on port 3000!`))
})()
```

You can use `app` to extend the routes as it is the [Typical express application](https://expressjs.com/en/4x/api.html#app)

**PRO TIP** By default Swagger validator will be disabled as adding new routes can be complicated, but you can enable it:

```js
const appInitialization = require('@UlisesGascon/simple-api')

;(async () => {
  const app = await appInitialization({
    swaggerEnabled: true
  })

  app.listen(3000, () => console.log(`Server listening on port 3000!`))
})()
```

## Docker Version 🐳

Use Docker Hub:

```bash
# Pull the image from Docker Hub:
docker pull ulisesgascon/simple-api:latest

# Run container:
docker run -p 3000:3000 ulisesgascon/simple-api:latest
```

To build and run the container locally:

```bash
# Clone Repo:
git clone https://github.com/ulisesgascon/simple-api.git

# Change to repo's cloned directory:
cd simple-api

# Build Image locally:
docker build --no-cache -t ulisesgascon/simple-api:latest .

# Run container:
docker run -p 3000:3000  ulisesgascon/simple-api:latest
```

# Development 🚀

## Clone

```bash
git clone https://github.com/UlisesGascon/simple-api.git
cd simple-api
```

## Install

```bash
nvm use
npm i
```

## Start

```bash
# Regular
npm run start

# prettier logs:
npm run dev
```

## Test

```bash
npm run test:coverage
```

## Linting

```bash
npm run lint
npm run lint:fix
```

## Formatting

```bash
npm run format
npm run format:fix
```

## Contributing

Please consult [CONTRIBUTING](https://github.com/UlisesGascon/.github/blob/main/contributing.md) for guidelines on contributing to this project.

## Author

**@ulisesgascon/simple-api** © [Ulises Gascón](https://github.com/ulisesgascon), Released under the [MIT](./LICENSE) License.
