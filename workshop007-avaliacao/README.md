# Find-a-Dish Node

## Requisites

- Node 16+
- npm 8.5+
- Docker and docker-compose

## Setup

To get the project up and running with Docker, you'll need to install all the dependencies:

```sh
$ npm run docker:install
```

Then create a copy of `.env.example` called `.env` and replace the default values if necessary

```sh
$ cp .env.example .env
```

Create the databases for development and test

```sh
$ npm run docker:db:create:dev
$ npm run docker:db:create:test
```

## Running the project

Before running the project, be sure to run the database migrations:

```sh
$ npm run docker:db:migrate:dev
```

Then you can run the stack:

```sh
$ npm run docker:dev
```

You can access the Swagger docs of the app in http://localhost:3000/api-docs

## Running the tests

Before running the tests, be sure to run the database migrations in the test environment:

```sh
$ npm run docker:db:migrate:test
```

Then you can run the tests:

```sh
$ npm run docker:test
```
