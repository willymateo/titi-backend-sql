"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Experiences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Experiences.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => uuid.v4(),
      },
      id_publisher_user: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      id_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      num_allow_users: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Experiences",
      tableName: "experiences",
    }
  );
  return Experiences;
};
