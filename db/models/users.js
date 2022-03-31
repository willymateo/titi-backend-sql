"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => uuid.v4(),
      },
      id_rol: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        //to define
        //defaultValue: Sequelize.UUID,
      },
      id_current_state: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        //To define
        //defaultValue:
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          is: /^\w{5,30}$/i,
          len: [5, 30],
          notNull: true,
          notEmpty: true,
        },
      },
      password_hash: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      first_names: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      last_names: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      num_later: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      num_missing: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
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
      modelName: "Users",
      tableName: "users",
    }
  );
  return Users;
};
