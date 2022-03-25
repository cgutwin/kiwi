FROM node:lts-alpine as build
WORKDIR /usr/src/kiwi

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src src
COPY public public
COPY types types
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from build stage
COPY --from=build /usr/src/kiwi/build .
COPY default.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
