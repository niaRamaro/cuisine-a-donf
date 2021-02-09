FROM node:current-alpine

ENV PORT 8080
ENV MONGO_HOST mongo:27017

WORKDIR /usr/cuisine-a-donf

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]