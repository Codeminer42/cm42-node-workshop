# ledgerdary-node

## Requisites

- Node 16+
- npm 8.5+
- Docker and docker-compose

## Setup

Create a copy of `.env.example` called `.env` and replace the default values if necessary

```sh
$ cp .env.example .env
```

```sh
$ npm run docker:install
```

Create the databases for development and test

```sh
$ npm run docker:db:create:dev
$ npm run docker:db:create:test
```

## Development: Running the project

Before running the project, be sure to run the database migrations and seeds:

```sh
$ npm run docker:db:migrate:dev
$ npm run docker:db:seed:dev
```

Then you can run the stack:

```sh
$ npm run docker:dev
```

## Testing: Running the tests

Before running the tests, be sure to run the database migrations in the test environment:

```sh
$ npm run docker:db:migrate:test
```

Then you can run the tests:

```sh
$ npm run docker:test
```

## Rolling back

If needed, you may run the rollback commands:

```sh
$ npm run docker:db:rollback:<test|dev>
```
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table balance_snapshots {
  id integer [primary key]
  ledger_id integer
  created_at timestamp
}

Table balance_snapshot_entries {
  balance_snapshots_id integer
  amount integer
  currency string
}

Ref: balance_snapshot_entries.balance_snapshots_id > balance_snapshots.id // many-to-one
