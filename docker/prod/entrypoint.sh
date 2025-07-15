#!/bin/sh

npx prisma migrate deploy

npx prisma db seed

# launch the main application
yarn start:prod
