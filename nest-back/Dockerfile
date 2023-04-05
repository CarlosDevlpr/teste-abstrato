FROM node:alpine

RUN apk add --no-cache --update \
    g++ \
    gcc \
    make \
    python3 \
    vips-dev

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN yarn add ts-node-dev --dev

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]
