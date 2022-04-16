"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.fn("gen_random_uuid"),
          allowNull: false,
          primaryKey: true,
          unique: true,
          comment: "PK, unique identifier.",
        },
        id_role: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 1,
          references: {
            model: "user_roles", //Table name.
            key: "id",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
          comment: "FK to current user role.",
        },
        username: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
          comment:
            "Unique. Must contain between 5-30 characters. The allow characters are letters in lowercase, numbers and underscores. It must contain at least 1 letter in lowercase.",
        },
        password_hash: {
          type: Sequelize.STRING(60),
          allowNull: false,
          comment: "Encrypted password.",
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
          comment: "Email linked with the account. It must be unique.",
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
      },
      {
        comment: "Users accounts information.",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
