# CatHot API

Backend API RestFul SQL to CatHot web.

## Specifications

- Backend Framework: NodeJs
- Web Application Framework: Express
- DB engine: PostgreSQL
- ORM: Sequelize

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

#Development
DEV_DB_USERNAME=
DEV_DB_PASSWORD=
DEV_DATABASE=cathot_dev
DEV_DB_HOST="127.0.0.1"
DEV_DB_PORT=5432

#Test
TEST_DB_USERNAME=
TEST_DB_PASSWORD=
TEST_DATABASE=cathot_test
TEST_DB_HOST="127.0.0.1"
TEST_DB_PORT=5432

#Production
PROD_DB_USERNAME=
PROD_DB_PASSWORD=
PROD_DATABASE=cathot
PROD_DB_HOST="127.0.0.1"
PROD_DB_PORT=5432

#Email
STAFF_EMAIL=
STAFF_PASSWORD=

#Json Web Token
TOKEN_PRIVATE_KEY=99cbe8d9c82100be56533b22e19ccadbac480bfd983e60f556440698e3665757
```

### Create the Data Base

```cmd
npx sequelize-cli db:create
```

### Apply migrations

```cmd
npx sequelize-cli db:migrate
```

### Apply seeders

```cmd
npx sequelize-cli db:seed:all
```

## Run server

### Production

```cmd
npm run start
```

### Development

```cmd
npm run devstart
```

## Run tests

### Note

Run Data Base creation, migrations, and seeders commands if it's necessary.

```cmd
npm run test
```
