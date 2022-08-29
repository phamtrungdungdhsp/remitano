## Description

Rest API using Nest + Typeorm + Postgres

- Node: v16.14.2
- TypeORM: 0.3.7
- Postgres: 14.5


## Codebase Structure
```bash
|-- src
|---- config      # Config for codebase: database,env. graphql,etc.
|---- core        # Contain the common things: base entity, interfaces, etc.
|---- users  # Normal module
|-------- http # Contain controller rest api: dto, controller, interceptors, guard, etc.
|----------- controllers
|----------- dtos
|----------- interceptors 
|-------- database
|----------- migrations # Contain migration files
|-------- entities
|-------- repositories # Communicate with database
|-------- services # Handle logic
|-- app.controller.ts
|-- app.module.ts
|-- app.resolver.ts
|-- app.service.ts
|-- main.ts


```
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
## Testing
- Create database name that combine the database name plus `_testing` (For example, if your main datbase in env is `remitano` => `remitano_testing`)

```bash
# e2e test
$ yarn test:e2e /source...

# unit test
$ yarn test:unit /source...
```