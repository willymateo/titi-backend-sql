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
      id_rol: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: "user_roles", //Table name.
          key: "id",
        },
      },
      id_current_state: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: "user_states", //Table name.
          key: "id",
        },
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        comment:
          "Must contain between 5-30 characters. The allow characters are letters in lowercase, numbers and underscores. It must contain at least 1 letter in lowercase.",
      },
      password_hash: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      first_names: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      last_names: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      photo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      num_later: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      num_missing: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable("users");
  },
};
