"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("island_members", {
      id_island: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        unique: "compositeIndex",
        references: {
          model: "islands", //Table name.
          key: "id",
        },
        comment: "PK, composite unique identifier. FK to an island.",
      },
      id_user: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        unique: "compositeIndex",
        references: {
          model: "users", //Table name.
          key: "id",
        },
        comment:
          "PK, composite unique identifier. FK to an member user of the island.",
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Is true when the user is an island administrator.",
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
    await queryInterface.dropTable("island_members");
  },
};
