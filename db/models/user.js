"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: DataTypes.STRING,
      id_current_state: DataTypes.INTEGER,
      username: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      first_names: DataTypes.STRING,
      last_names: DataTypes.STRING,
      email: DataTypes.STRING,
      photo_url: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      num_later: DataTypes.INTEGER,
      num_missing: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
