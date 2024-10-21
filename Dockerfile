FROM node:14-alpine as kfg-front-vendor

WORKDIR /app

COPY package*.json ./

RUN npm i

###################################################################

FROM node:14-alpine as kfg-front-assets

WORKDIR /app

COPY --from=kfg-front-vendor /app/node_modules /app/node_modules

COPY . .

RUN npm run build

# CMD npm run dev

###################################################################

FROM nginx:alpine

COPY --from=kfg-front-assets /app/dist/spa /usr/share/nginx/html
