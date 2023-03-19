# Stage-1 dependencies
FROM node:18.14.1 as dependencies
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i --only=production

# Stage-2 final image
FROM node:18.14.1-alpine

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