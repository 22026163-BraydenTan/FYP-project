FROM node:latest

WORKDIR /usr/src/app

COPY server/package.json ./server/
RUN cd ./server && npm install

COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]
