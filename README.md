# Boilerplate Application API

## Pre-requisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Installation

Copy `.env.template` to `.env` and update the values as needed.

Install dependencies:

```sh
yarn
```

## Development

Start application in development mode:

```sh
yarn dev
```

Run application with docker compose:

```sh
# to build services
docker compose build

# to start services
docker compose up -d

# to see logs
docker compose logs -f

# to stop and remove containers
docker compose down --volumes --remove-orphans
```

## Testing

```sh
# simple test check
yarn test

# test with coverage
yarn test:ci
```

### Build & Run

```bash
yarn build
yarn start:dev
```

## Call Endpoints

Server runs on localhost port 3333 (8080 on docker) by default:

```sh
export APP_API_KEY=123 # API Key matching .env definition
curl -X GET http://0.0.0.0:3333/health
curl -X GET -H "x-api-key: $APP_API_KEY" "http://localhost:3333/api/v1/health"
curl -X GET -H "x-api-key: $APP_API_KEY" "http://localhost:3333/api/v1/module/123"
curl -X GET -H "x-api-key: $APP_API_KEY" "http://localhost:3333/api/v1/module/xyz?extra=abc"
```
