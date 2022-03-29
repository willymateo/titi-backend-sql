"use strict";
const { Model } = require("sequelize");
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
      id_user: DataTypes.STRING,
      country_code: DataTypes.INTEGER,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Phones",
    }
  );
  return Phones;
};
