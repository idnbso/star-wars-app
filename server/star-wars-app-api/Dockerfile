FROM node:19-alpine

WORKDIR /user/src/server/star-wars-app-api

COPY . ./

RUN npm config set registry https://registry.npmjs.org

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
