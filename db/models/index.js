"use strict";
const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const sequelizerc = require(__dirname + "/../../config/.sequelizerc");
const config = require(sequelizerc.config)[env];
const db = {};

// Show the environment.
console.log(`Environment: ${process.env.NODE_ENV}`);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Hooks
// Timestamps
sequelize.beforeUpdate(async (model, options) => {
  model.updatedAt = DataTypes.NOW;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
