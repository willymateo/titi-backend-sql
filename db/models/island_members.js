"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Island_members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Island_members.init(
    {
      id_island: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        unique: "compositeIndex",
        validate: {
          isUUID: 4,
        },
      },
      id_user: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        unique: "compositeIndex",
        validate: {
          isUUID: 4,
        },
      },
      is_admin: {
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
      modelName: "Island_members",
      tableName: "island_members",
    }
  );
  return Island_members;
};
