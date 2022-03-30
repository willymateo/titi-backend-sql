"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      id_current_state: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //to define
        //defaultValue: Sequelize.UUID,
        references: {
          model: "user_states", //Table name.
          key: "id",
        },
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      first_names: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_names: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      photo_url: {
        type: Sequelize.STRING,
        allowNull: false,
        //to define
        //defaultValue: Sequelize.UUID,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      num_later: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      num_missing: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable("users");
  },
};
