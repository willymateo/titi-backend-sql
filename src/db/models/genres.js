"use strict";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";

const Genres = sequelize.define(
  "Genres",
  {
    id: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: "PK, unique identifier.",
    },
    genre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isLowercase: true,
      },
      comment:
        "Unique genre identifier. If it contains 2 or more words, they can be separate between underscores.",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "genres",
    comment: "All genres of an user.",
  }
);

export { Genres };
