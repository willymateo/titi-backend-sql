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
        //to define
        //defaultValue: Sequelize.UUID,
        references: {
          model: "user_roles", //Table name.
          key: "id",
        },
      },
      id_current_state: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        //to define
        //defaultValue: Sequelize.UUID,
        references: {
          model: "user_states", //Table name.
          key: "id",
        },
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
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
