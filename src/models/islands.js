"use strict";
import { sequelize } from "../database";
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
      field: "photo_url",
      comment: "The url to profile photo.",
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_public",
      comment: "Is true when the island visibility is open to public.",
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
    tableName: "islands",
    comment: "An island is a group of users.",
  }
);

export { Islands };
