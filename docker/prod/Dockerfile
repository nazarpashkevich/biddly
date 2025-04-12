FROM node:22-alpine

# https://github.com/nodejs/docker-node/issues/2175#issuecomment-2530593321
RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

# create a working directory
WORKDIR /app

# bundle app source
COPY . .

# install app dependencies
RUN yarn install

# creates a "dist" folder with the production build
RUN yarn build

# set the environment variable
ENV NODE_ENV=production

# launch command for production environment
ENTRYPOINT ["sh", "-c", "yarn prisma migrate deploy && yarn start:prod"]
