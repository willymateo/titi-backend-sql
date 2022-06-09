"use strict";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";

const UserStates = sequelize.define(
  "UserStates",
  {
    id: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: "PK, unique identifier.",
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isLowercase: true,
      },
      comment:
        "Unique user state identifier. If it contains 2 or more words, they can be separate between underscores.",
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
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "user_states",
    comment: "All states of an user.",
  }
);

export { UserStates };
