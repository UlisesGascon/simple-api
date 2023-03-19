# Stage-1 dependencies
FROM node:18.14.1@sha256:671b86a524e12beac53f6679d791dc8b73bff3a46edf4878343e82503cb33938 as dependencies
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i --only=production

# Stage-2 final image
FROM node:18.14.1-alpine@sha256:e0a779479fca9cf43cae2852291bee70e730ae3ad27fea1211060bd344b696b8

LABEL org.label-schema.name="simple-api" \
    org.label-schema.description="simple-api Docker image" \
    org.label-schema.url="https://www.npmjs.com/package/simple-api" \
    org.label-schema.vcs-url="https://github.com/ulisesgascon/simple-api" \
    org.label-schema.maintainer="ulisesgascon" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.docker.cmd="docker run -p 3000:3000  ulisesgascon/simple-api:latest"

WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY /src ./src
EXPOSE 3000
CMD [ "npm", "start" ]