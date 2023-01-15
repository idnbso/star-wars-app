FROM node:19-alpine

WORKDIR /user/src/client/star-wars-app-ui

COPY . ./

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 4200

CMD ["npm", "start"]
