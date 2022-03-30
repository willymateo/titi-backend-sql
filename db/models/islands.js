"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Islands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Islands.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => uuid.v4(),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Islands",
      tableName: "islands",
    }
  );
  return Islands;
};
