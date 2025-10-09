# --- Stage 1: Build ---
FROM node:22-alpine AS build

# Installer uniquement les dépendances nécessaires pour le build
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

WORKDIR /app
COPY package.json yarn.lock ./

# Installer les dépendances de production uniquement pour Strapi
RUN yarn install --production

# Copier le code source
COPY . .

# Construire Strapi (si nécessaire)
RUN yarn build

# --- Stage 2: Production ---
FROM node:22-alpine

# Installer vips uniquement pour Strapi
RUN apk add --no-cache vips-dev

WORKDIR /app

# Copier les node_modules et l'application depuis le build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app ./

RUN mkdir -p /app/public/uploads

USER root

EXPOSE 1337
CMD ["yarn", "start"]
