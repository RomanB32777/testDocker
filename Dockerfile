FROM node:14.15.4-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
