"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "profile_information",
      {
        id: {
          type: Sequelize.UUID,
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
          comment: "FK to owner user of profile information.",
        },
        id_current_state: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 1,
          references: {
            model: "user_states", //Table name.
            key: "id",
          },
          comment: "FK to current status.",
        },
        photo_url: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "The url to profile photo.",
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
          comment: "User description or biography.",
        },
        num_later: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 0,
          comment:
            "Number of times the user has been engaged in an adventure and he arrived late.",
        },
        num_missing: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 0,
          comment:
            "Number of times the user has been engaged in an adventure and he did not attend.",
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
        comment: "Information about interactions and status of each user.",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("profile_information");
  },
};
