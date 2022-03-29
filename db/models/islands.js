"use strict";
const { Model } = require("sequelize");
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
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      photo_url: DataTypes.STRING,
      is_public: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Islands",
    }
  );
  return Islands;
};
