import { createUserRoles, createUserStates, createAdventureStates } from "../libs/initialSetup";
import { sequelize } from "../db/connection";

export default async (globalConfig, projectConfig) => {
  await Promise.all([createUserRoles(), createUserStates(), createAdventureStates()]);
  globalThis.sequelize = sequelize;
};
