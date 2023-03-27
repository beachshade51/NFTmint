FROM node:14 AS Production

ENV NODE_ENV=production

WORKDIR /urs/src/client

COPY package*.json . 

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run start"]