"use strict";

const { DEFAULT_PHONE_COUNTRY_CODE } = require("../../config/app.config");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "phones",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.fn("gen_random_uuid"),
          allowNull: false,
          primaryKey: true,
          unique: true,
          comment: "PK, unique identifier.",
        },
        id_user: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "users", // Table name.
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          comment: "FK to owner user of the phone number.",
        },
        country_code: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: DEFAULT_PHONE_COUNTRY_CODE,
          comment: "Country code of the phone number.",
        },
        phone_number: {
          type: Sequelize.STRING(15),
          allowNull: false,
          comment: "Phone number without the county code.",
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
        comment: "Users phone numbers.",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("phones");
  },
};
