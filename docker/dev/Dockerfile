FROM node:22-alpine

WORKDIR /app

RUN corepack enable

# copy yarn files
COPY package.json yarn.lock ./

RUN yarn install

COPY docker/dev/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
