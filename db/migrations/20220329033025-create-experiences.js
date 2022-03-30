"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("experiences", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        //PostgreSQL ??????????
        //defaultValue: Sequelize.UUID,
      },
      id_publisher_user: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users", //Table name.
          key: "id",
        },
      },
      id_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //to define
        //defaultValue: Sequelize.UUID,
        references: {
          model: "experience_states", //Table name.
          key: "id",
        },
      },
      start_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        //PostgreSQL ??????????
        defaultValue: Sequelize.fn("NOW"),
      },
      end_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      num_allow_users: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        //PostgreSQL ??????????
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        //PostgreSQL ??????????
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("experiences");
  },
};
