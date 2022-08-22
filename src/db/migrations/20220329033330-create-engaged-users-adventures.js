"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "engaged_users_adventures",
      {
        id_adventure: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          unique: "compositeIndex",
          references: {
            model: "adventures", // Table name.
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          comment: "PK, composite unique identifier. FK to an adventure.",
        },
        id_user: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          unique: "compositeIndex",
          references: {
            model: "users", // Table name.
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          comment: "PK, composite unique identifier. FK to an engaged user with the adventure.",
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
        comment: "Engaged users with adventures.",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("engaged_users_adventures");
  },
};
