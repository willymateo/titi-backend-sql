"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "profile_information",
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
          unique: true,
          references: {
            model: "users", // Table name.
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          comment: "FK to owner user of profile information.",
        },
        id_current_state: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 1,
          references: {
            model: "user_states", // Table name.
            key: "id",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
          comment: "FK to current status.",
        },
        id_genre: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 1,
          references: {
            model: "genres", // Table name.
            key: "id",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
          comment: "FK to genre.",
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
        comment: "Information about interactions and status of each user.",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("profile_information");
  },
};
