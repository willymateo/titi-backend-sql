import { createUserRoles, createUserStates, createAdventureStates } from "../libs/initialSetup";
import { testConnection, syncModels, sequelize } from "../db/connection";
import { server } from "../index";

module.exports = async function (globalConfig, projectConfig) {
  await testConnection();
  await syncModels();
  await createUserRoles();
  await createUserStates();
  await createAdventureStates();
  globalThis.sequelize = sequelize;
  globalThis.server = server;
};
