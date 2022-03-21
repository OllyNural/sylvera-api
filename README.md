# Sylvera APIs

This project contains a set of APIs designed to interact with user and order data.

The APIs are written in NodeJs with Typescript, using Koa and Knex. The data is persisted in a PostgreSQL database.

## Running

First install dependencies:

`npm install`

Then run the server locally:

`npm start`

This will launch the server at `localhost:3000`

## Endpoints

`/ping` - Returns Pong!

## Testing

TODO
## Choices


### Local running

In a Production environment, I would run this code either in a Docker container or in a Lambda. In either case, the build pipeline will run install, lint, test etc and then build and compile the Typescript.

### Local Postgres

I chose to use a local Postgresql docker container in docker-compose for local development as it's fairly quick and easy to get running, and should be the same on all engineers' machines. 
