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
        type: DataTypes.UUIDV4,
        allowNull: false,
        unique: "compositeIndex",
      },
      id_user: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
        allowNull: false,
        unique: "compositeIndex",
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
