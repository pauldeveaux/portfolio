FROM node:22.19.0-alpine AS base
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy app and build
COPY . .
RUN npm run build

# Production image
FROM node:22.19.0-alpine AS final
WORKDIR /usr/src/app
ENV NODE_ENV=production

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
USER node

COPY --from=base /usr/src/app/package*.json ./
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/.next ./.next
COPY --from=base /usr/src/app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
