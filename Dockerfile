FROM node:16.0.0-alpine AS builder

WORKDIR /home/node
COPY --chown=node:node . .

ARG BUILD_EXPIRE
ARG BUILD_DOMAIN
ARG NPM_AUTH_TOKEN

USER node

ENV NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN}

RUN npm install -f
RUN npm run build

FROM nginx:mainline-alpine

COPY --from=builder /home/node/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY env.js /usr/share/nginx/html
EXPOSE 80

