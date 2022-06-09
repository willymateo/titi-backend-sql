"use strict";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

const Islands = sequelize.define(
  "Islands",
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
      comment: "The url to profile photo.",
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Is true when the island visibility is open to public.",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "islands",
    comment: "An island is a group of users.",
  }
);

export { Islands };
