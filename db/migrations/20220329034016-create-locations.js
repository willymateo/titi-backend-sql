"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("locations", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        comment: "PK, unique identifier.",
      },
      id_user: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users", //Table name.
          key: "id",
        },
        comment: "FK to user that is in the location.",
      },
      latitude: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      current: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "Is true when it is the current user location to play.",
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
        comment: "The datetime of deletion. Is null when is an active entry.",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("locations");
  },
};
