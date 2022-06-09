const path = require("path");
require("@babel/register");

module.exports = {
  config: path.resolve("src/config", "db.config.js"),
  "models-path": path.resolve("src", "models"),
  "seeders-path": path.resolve("src/db", "seeders"),
  "migrations-path": path.resolve("src/db", "migrations"),
};
