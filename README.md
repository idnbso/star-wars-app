# star-wars-app
## Tech Stack
* Server side: NestJS 9
* Client side: Angular 15

## Docker Commands

Build the images with docker-compose:

```
docker-compose build --no-cache
```

Run the containers:

```
docker-compose up
```

## App Addresses

Access the UI:

```
http://localhost:4200
```

Access the API:

```
http://localhost:3000
```

Access the API Swagger page:

```
http://localhost:3000/api
```

## Development

Client Side App

```
cd client/star-wars-app-ui && ng serve
```

Client Side Tests

```
cd client/star-wars-app-ui && ng test
```

Server Side App

```
cd server/star-wars-app-api && npm run start:dev
```

Server Side Tests

```
cd server/star-wars-app-api && npm run test
```
