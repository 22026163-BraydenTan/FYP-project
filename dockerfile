FROM node:latest

WORKDIR /usr/src/app

COPY server/package*.json ./server/
COPY src/package*.json ./src/

RUN cd ./server && npm install

RUN cd ./src && npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server/server.js" ]
