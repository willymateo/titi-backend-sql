"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Profile_information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: "id_user",
      });

      models.Users.hasOne(this, {
        foreignKey: "id_user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsTo(models.User_states, {
        foreignKey: "id_current_state",
      });

      models.User_states.hasMany(this, {
        foreignKey: "id_current_state",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    }
  }

  Profile_information.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => uuid.v4(),
        validate: {
          isUUID: 4,
        },
        comment: "PK, unique identifier.",
      },
      id_user: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          isUUID: 4,
        },
        comment: "FK to owner user of profile information.",
      },
      id_current_state: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        comment: "FK to current status.",
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
        comment: "The url to profile photo.",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
        comment: "User description or biography.",
      },
      num_later: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
        comment:
          "Number of times the user has been engaged in an adventure and he arrived late.",
      },
      num_missing: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
        comment:
          "Number of times the user has been engaged in an adventure and he did not attend.",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: "The creation datetime.",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: "The datetime of last modification.",
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        comment: "The datetime of deletion. Is null when is an active entry.",
      },
    },
    {
      sequelize,
      modelName: "Profile_information",
      tableName: "profile_information",
    }
  );
  return Profile_information;
};
