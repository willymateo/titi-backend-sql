"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("adventure_states", {
      id: {
        type: Sequelize.SMALLINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      state: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        comment: "The creation datetime.",
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        comment: "The datetime of last modification.",
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
        comment: "The datetime of deletion.",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("adventure_states");
  },
};
