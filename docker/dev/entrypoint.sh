#!/bin/sh

npx prisma generate
npx prisma migrate deploy

# launch studio in the background
yarn prisma studio &

# launch the main application
yarn start:dev
