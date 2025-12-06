#!/bin/sh

# check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  yarn install
fi

npx prisma generate
npx prisma migrate deploy

# launch studio in the background
yarn prisma studio &

# launch the main application
yarn start:dev
