FROM node:24-alpine

WORKDIR /app

RUN corepack enable

COPY docker/dev/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
