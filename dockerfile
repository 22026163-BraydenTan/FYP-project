FROM node:22-slim

WORKDIR /usr/src/

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "Server.js" ]
