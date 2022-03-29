"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Locations.init(
    {
      id_user: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      address: DataTypes.STRING,
      current: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Locations",
    }
  );
  return Locations;
};
