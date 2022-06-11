export default async (globalConfig, projectConfig) => {
  await globalThis.sequelize.close();
};
