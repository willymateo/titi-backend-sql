"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Phones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Phones.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => uuid.v4(),
      },
      id_user: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      country_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 593,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Phones",
      tableName: "phones",
    }
  );
  return Phones;
};
