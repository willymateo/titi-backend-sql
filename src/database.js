"use strict";
import { Sequelize, DataTypes } from "sequelize";
import dbConfig from "../config/db.config";

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Hooks
// Timestamps
sequelize.beforeUpdate(async (model, options) => {
  model.updatedAt = DataTypes.NOW;
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Environment: ${env}`);
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const syncModels = async () => {
  if (env !== "production") {
    try {
      await sequelize.sync({ force: true });
      console.log(`Environment: ${env}`);
      console.log("All models were synchronized successfully.");
    } catch (error) {
      console.error("Unable to sync database:", error);
    }
  }
};

export { testConnection, syncModels, sequelize };
