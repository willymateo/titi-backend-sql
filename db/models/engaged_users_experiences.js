"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Engaged_users_experiences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Engaged_users_experiences.init(
    {
      id_experience: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: "compositeIndex",
      },
      id_user: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: "compositeIndex",
      },
      is_publisher: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
        comment: "The datetime of deletion.",
      },
    },
    {
      sequelize,
      modelName: "Engaged_users_experiences",
      tableName: "engaged_users_experiences",
    }
  );
  return Engaged_users_experiences;
};
