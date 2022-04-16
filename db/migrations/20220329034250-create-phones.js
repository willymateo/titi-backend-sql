"use strict";
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
            model: "users", //Table name.
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          comment: "FK to owner user of the phone number.",
        },
        country_code: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 593,
        },
        phone_number: {
          type: Sequelize.STRING(15),
          allowNull: false,
          comment: "Phone number without the county code.",
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
        comment: "Users phone numbers.",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("phones");
  },
};
