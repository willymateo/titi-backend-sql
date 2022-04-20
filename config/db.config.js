require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
    // Ecuador timezone
    timezone: "-05:00",
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
    // Ecuador timezone
    timezone: "-05:00",
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DATABASE,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
      supportBigNumbers: true,
      // ssl: {
      // ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
      // }
    },
    // Ecuador timezone
    timezone: "-05:00",
  },
};
