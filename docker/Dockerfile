FROM --platform=linux/amd64 node:18.16.0-alpine3.18 AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY . .

RUN yarn install --production=true
RUN yarn add -D typescript
RUN yarn build

FROM --platform=linux/amd64 node:18.16.0-alpine3.18

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .

RUN mkdir -p /app/out
RUN apk add --no-cache curl

CMD ["yarn" ,"start"]
