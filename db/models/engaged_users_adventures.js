"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Engaged_users_adventures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Engaged_users_adventures.init(
    {
      id_adventure: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: "compositeIndex",
        validate: {
          isUUID: 4,
        },
        comment: "PK, composite unique identifier. FK to an adventure.",
      },
      id_user: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: "compositeIndex",
        validate: {
          isUUID: 4,
        },
        comment:
          "PK, composite unique identifier. FK to an engaged user with the adventure.",
      },
      is_publisher: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment:
          "Is true when the user is the owner/publisher of the adventure.",
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
      modelName: "Engaged_users_adventures",
      tableName: "engaged_users_adventures",
    }
  );
  return Engaged_users_adventures;
};
