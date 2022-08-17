[![Node.js CI](https://github.com/willymateo/cathot-backend-sql/actions/workflows/node.js.yml/badge.svg)](https://github.com/willymateo/cathot-backend-sql/actions/workflows/node.js.yml)

# CatHot API

Backend API RestFul SQL to CatHot web.

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

https://cathot.up.railway.app/

### Development

https://cathot-development.up.railway.app/

## Documentation

### Entity Relationship Diagram

[LucidChart](https://lucid.app/lucidchart/8887566c-ab08-4e36-aad1-11405f69a67e/edit?viewport_loc=-1544%2C205%2C1548%2C663%2C0_0&invitationId=inv_986780f9-981b-4492-8249-3345a44e7c64)
