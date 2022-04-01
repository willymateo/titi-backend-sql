"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "adventure_states",
      {
        id: {
          type: Sequelize.SMALLINT,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
          comment: "PK, unique identifier.",
        },
        state: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
          comment:
            "Unique adventure state identifier. If it contains 2 or more words, they can be separate between underscores.",
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "Description of the use case.",
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
        comment: "All states of an adventure.",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("adventure_states");
  },
};
