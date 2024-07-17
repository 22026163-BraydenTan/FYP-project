FROM node:latest

WORKDIR /usr/src/app

COPY server/package*.json ./server/
COPY src/package*.json ./src/

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server/server.js" ]
