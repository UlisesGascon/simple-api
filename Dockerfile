# Dockerfile for ulisesgascon/simple-api
# License: MIT
# © Ulises Gascon 2023
FROM node:18-alpine
LABEL org.label-schema.name="simple-api" \
    org.label-schema.description="simple-api Docker image" \
    org.label-schema.url="https://www.npmjs.com/package/simple-api" \
    org.label-schema.vcs-url="https://github.com/ulisesgascon/simple-api" \
    org.label-schema.maintainer="ulisesgascon" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.docker.cmd="docker run -p 3000:3000 ulisesgascon/simple-api:latest"

# Configure npm
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN mkdir -p /home/node/simple-api
WORKDIR /home/node/simple-api

# Install from npmjs.com
RUN npm install --only=prod -g @ulisesgascon/simple-api

CMD ["sh", "-c", "npx @ulisesgascon/simple-api@2.0.2 3000"]