FROM node:lts-buster

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7000

RUN npm run build

RUN npm run webpack

CMD node build/main