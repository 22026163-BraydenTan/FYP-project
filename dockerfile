FROM node:latest

WORKDIR /usr/src/app
COPY server/package.json ./

RUN npm install
COPY . .

EXPOSE 3000
CMD [ "node", "Server.js" ]
