"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User_roles, {
        foreignKey: "id_role",
      });

      models.User_roles.hasMany(this, {
        foreignKey: "id_role",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
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
        comment: "PK, unique identifier.",
      },
      id_role: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        comment: "FK to current user role.",
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          is: /^[a-z0-9_\.]*[a-z]+[a-z0-9_\.]*$/i,
          isLowercase: true,
          len: [5, 30],
          notNull: true,
          notEmpty: true,
        },
        comment:
          "Unique. Must contain between 5-30 characters. The allow characters are letters in lowercase, numbers and underscores. It must contain at least 1 letter in lowercase.",
      },
      password_hash: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        comment: "Encrypted password.",
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
          notNull: true,
          notEmpty: true,
        },
        comment: "Email linked with the account. It must be unique.",
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
        comment: "The datetime of deletion. Is null when is an active entry.",
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
    }
  );

  //Hooks.
  //Usuario.beforeBulkCreate(async (usuario, {}) => {
  //usuario.passwordHash = await bcrypt.hash(usuario.passwordHash, saltRounds);
  //});

  //Usuario.beforeBulkUpdate(async (usuario, {}) => {
  //usuario.passwordHash = await bcrypt.hash(usuario.passwordHash, saltRounds);
  //});

  Users.beforeCreate(async (user, options) => {
    user.password_hash = await bcrypt.hash(user.password_hash, saltRounds);
  });

  Users.beforeUpdate(async (user, options) => {
    if (options.fields.includes("password_hash")) {
      user.password_hash = await bcrypt.hash(user.password_hash, saltRounds);
    }
  });

  return Users;
};
