"use strict";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";

const UserRoles = sequelize.define(
  "UserRoles",
  {
    id: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: "PK, unique identifier.",
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isLowercase: true,
      },
      comment:
        "Unique user role identifier. If it contains 2 or more words, they can be separate between underscores.",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
      comment: "Description of the use case.",
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
    tableName: "user_roles",
    comment: "All roles that can have an user.",
  }
);

export { UserRoles };
