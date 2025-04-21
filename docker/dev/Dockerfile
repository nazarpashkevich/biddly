FROM node:23-alpine

WORKDIR /app

RUN corepack enable

ENTRYPOINT ["sh", "-c", "npx prisma generate && yarn prisma migrate deploy && yarn start:dev"]
