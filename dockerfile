# Choose the Image which has Node installed already
FROM node:alpine as build

WORKDIR /code

COPY package.json package.json

RUN npm ci --production
# COPY all the files from Current Directory into the Container
COPY . .

# Install the Project Dependencies like Express Framework
RUN npm run build

FROM nginx:1.22-alpine as prod

COPY --from=build /code/build /usr/share/nginx/html

# Tell that this image is going to Open a Port 
EXPOSE 80

# Default Command to launch the Application
CMD ["nginx", "-g", "daemon off;"]
