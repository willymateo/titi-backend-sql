import { initialSetup } from "../libs/initialSetup";
import { sequelize } from "../db/connection";

export default async (globalConfig, projectConfig) => {
  await initialSetup();
  globalThis.sequelize = sequelize;
};
