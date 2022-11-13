"use strict";
const { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } = require("../../config/app.config");

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
          references: {
            model: "user_roles", // Table name.
            key: "id",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
          comment: "FK to current user role.",
        },
        id_current_state: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          references: {
            model: "user_states", // Table name.
            key: "id",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
          comment: "FK to current status.",
        },
        id_gender: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          references: {
            model: "genders", // Table name.
            key: "id",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
          comment: "FK to gender.",
        },
        username: {
          type: Sequelize.STRING(USERNAME_MAX_LENGTH),
          allowNull: false,
          unique: true,
          comment: `Unique. Must contain between ${USERNAME_MIN_LENGTH}-${USERNAME_MAX_LENGTH} characters. The allow characters are letters in lowercase, numbers and underscores. It must contain at least 1 letter in lowercase.`,
        },
        password_hash: {
          type: Sequelize.STRING(60),
          allowNull: false,
          comment: "Encrypted password.",
        },
        first_names: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        last_names: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
          comment: "Email linked with the account. It must be unique.",
        },
        photo_url: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "The url to profile photo",
        },
        born_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          comment: "Born date to identify if the user is of legal age",
        },
        biography: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "User description or biography.",
        },
        num_later: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 0,
          comment: "Number of times the user has been engaged in an adventure and he arrived late.",
        },
        num_missing: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 0,
          comment:
            "Number of times the user has been engaged in an adventure and he did not attend.",
        },
        createdAt: {
          field: "created_at",
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
          comment: "The creation datetime.",
        },
        updatedAt: {
          field: "updated_at",
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
          comment: "The datetime of last modification.",
        },
        deletedAt: {
          field: "deleted_at",
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
