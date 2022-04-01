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
        validate: {
          isUUID: 4,
        },
      },
      id_rol: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
      },
      id_current_state: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          is: /^[a-z0-9_]*[a-z]+[a-z0-9_]*$/i,
          isLowercase: true,
          len: [5, 30],
          notNull: true,
          notEmpty: true,
        },
        comment:
          "Must contain between 5-30 characters. The allow characters are letters in lowercase, numbers and underscores. It must contain at least 1 letter in lowercase.",
      },
      password_hash: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      first_names: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      last_names: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
        validate: {
          notEmpty: true,
        },
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
