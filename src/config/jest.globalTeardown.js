module.exports = async function (globalConfig, projectConfig) {
  await globalThis.sequelize.close();
  await globalThis.server.close();
};
