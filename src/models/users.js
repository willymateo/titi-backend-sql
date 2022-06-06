"use strict";
import { UserRoles } from "./userRoles";
import { sequelize } from "../database";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const saltRounds = 10;

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
      validate: {
        isUUID: 4,
      },
      comment: "PK, unique identifier.",
    },
    idRole: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      field: "id_role",
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
    passwordHash: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
      field: "password_hash",
      comment: "Encrypted password.",
    },
    firstNames: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
      field: "first_names",
    },
    lastNames: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
      field: "last_names",
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
    tableName: "users",
    comment: "Users accounts information.",
  }
);

Users.belongsTo(UserRoles, {
  foreignKey: "idRole",
});

UserRoles.hasMany(Users, {
  foreignKey: "idRole",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Users.beforeCreate(async (user, options) => {
  user.passwordHash = await bcrypt.hash(user.passwordHash, saltRounds);
});

Users.beforeUpdate(async (user, options) => {
  if (options.fields.includes("passwordHash")) {
    user.passwordHash = await bcrypt.hash(user.passwordHash, saltRounds);
  }
});

export { Users };
