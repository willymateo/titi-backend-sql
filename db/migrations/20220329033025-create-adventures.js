"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "adventures",
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          unique: true,
          comment: "PK, unique identifier.",
        },
        id_status: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 1,
          references: {
            model: "adventure_states", //Table name.
            key: "id",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
          comment: "FK to current status.",
        },
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        start_datetime: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
          comment: "The datetime when the adventure was published.",
        },
        end_datetime: {
          type: Sequelize.DATE,
          allowNull: false,
          comment:
            "The datetime when the adventure will expire. Up to 24h since the start_datetime.",
        },
        num_invitations: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 1,
          comment:
            "Number of allow users that can engaged with the adventure. This number not include the publisher user.",
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
        comment: "Adventures published by users.",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("adventures");
  },
};
