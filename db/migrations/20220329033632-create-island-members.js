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
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("island_members");
  },
};
