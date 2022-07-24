"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "locations",
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
          comment: "FK to user that is in the location.",
        },
        latitude: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        longitude: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        is_current: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          comment: "Is true when it is the current user location to play.",
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
        comment: "Locations of each users.",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("locations");
  },
};
