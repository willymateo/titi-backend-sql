[![Node.js CI](https://github.com/willymateo/cathot-backend-sql/actions/workflows/node.js.yml/badge.svg)](https://github.com/willymateo/cathot-backend-sql/actions/workflows/node.js.yml)

# Titi API

Backend API RestFul SQL to Titi web.

## Specifications

- Backend Framework: NodeJs
- Server Framework: Express
- DB engine: PostgreSQL
- ORM: Sequelize
- Migrations management library: sequelize-cli

## SetUp

### Install dependencies

```cmd
npm install
```

### Configuration to Data Base connection

Create the file ".env" in the project root with the following content and put in the fields 'DB_USERNAME' and 'DB_PASSWORD' your Data Base credentials in the Development, Test and Production environments.

```cmd
#Environment.
NODE_ENV=development
PORT=3001

#Json Web Token
JWT_SECRET=
JWT_SALT_ROUNDS=

#Development
DEV_DB_USERNAME=
DEV_DB_PASSWORD=
DEV_DATABASE=
DEV_DB_HOST=
DEV_DB_PORT=

#Test
TEST_DB_USERNAME=
TEST_DB_PASSWORD=
TEST_DATABASE=
TEST_DB_HOST=
TEST_DB_PORT=

#Email
STAFF_EMAIL=
STAFF_PASSWORD=
```

## Run server

### Production

Note: Don't run this in local environment

```cmd
npm start
```

### Development

```cmd
npm run start:dev
```

## Run tests

```cmd
npm test
```

## Deployment environments

### Production

https://titi.up.railway.app/

### Development

https://titi-development.up.railway.app/

## Documentation

### Entity Relationship Diagram

[dbdiagram](https://dbdiagram.io/d/6304fd56f1a9b01b0fca7218)
