"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Adventure_states extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Adventure_states.init(
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
        comment: "PK, unique identifier.",
      },
      state: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          isLowercase: true,
        },
        comment:
          "Unique adventure state identifier. If it contains 2 or more words, they can be separate between underscores.",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        comment: "Description of the use case.",
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
      modelName: "Adventure_states",
      tableName: "adventure_states",
    }
  );
  return Adventure_states;
};
