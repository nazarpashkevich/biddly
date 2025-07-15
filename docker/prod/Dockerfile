# ----------- Stage 1: Build -----------
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY yarn.lock package.json ./

# Install all dependencies (including devDependencies)
RUN yarn install

# Copy the rest of the project files
COPY . .

# Generate Prisma scheme
RUN npx prisma generate

# Build the app
RUN yarn build

# ----------- Stage 2: Production -----------
FROM node:22-alpine AS production

# Set working directory
WORKDIR /app

# Copy only the necessary files for production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Copy static files
COPY --from=builder /app/public ./public

# Installation of only production depending
RUN yarn install --production

# Installation of a variable environment
ENV NODE_ENV=production

COPY docker/prod/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
