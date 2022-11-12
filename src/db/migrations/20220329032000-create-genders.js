"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "genders",
      {
        id: {
          type: Sequelize.SMALLINT,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
          comment: "PK, unique identifier.",
        },
        gender: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
          comment:
            "Unique gender identifier. If it contains 2 or more words, they can be separate between underscores.",
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
        comment:
          "Unique gender identifier. If it contains 2 or more words, they can be separate between underscores.",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("genders");
  },
};
