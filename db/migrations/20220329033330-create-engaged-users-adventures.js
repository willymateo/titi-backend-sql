"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("engaged_users_adventures", {
      id_adventure: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        unique: "compositeIndex",
        references: {
          model: "adventures", //Table name.
          key: "id",
        },
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
      },
      is_publisher: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable("engaged_users_adventures");
  },
};
