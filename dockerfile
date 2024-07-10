FROM nginx:1.10.1-alpine

WORKDIR /usr/src/

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "nginx", "node", "index.js" ]
