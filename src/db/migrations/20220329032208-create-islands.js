"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "islands",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.fn("gen_random_uuid"),
          allowNull: false,
          primaryKey: true,
          unique: true,
          comment: "PK, unique identifier.",
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        photo_url: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "The url to profile photo.",
        },
        is_public: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: "Is true when the island visibility is open to public.",
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
        comment: "An island is a group of users.",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("islands");
  },
};
